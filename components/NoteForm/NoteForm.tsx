'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

import { createNote } from '@/lib/api';
import type { CreateNoteDto } from '@/types/note';

import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
}

const initialValues: CreateNoteDto = {
  title: '',
  content: '',
  tag: 'Todo',
};

const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, 'Title must contain at least 3 characters')
    .max(50, 'Title cannot exceed 50 characters')
    .required('Title is required'),

  content: Yup.string().trim().max(500, 'Content cannot exceed 500 characters'),

  tag: Yup.string()
    .oneOf(
      ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'],
      'Select a valid tag'
    )
    .required('Tag is required'),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,

    onSuccess: async () => {
      toast.success('Note created');

      await queryClient.invalidateQueries({
        queryKey: ['notes'],
      });
    },

    onError: () => {
      toast.error('Failed to create note');
    },
  });

  return (
    <>
      <h2>Create note</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const normalizedValues: CreateNoteDto = {
            title: values.title.trim(),
            content: values.content.trim(),
            tag: values.tag,
          };

          try {
            await mutation.mutateAsync(normalizedValues);
            setSubmitting(false);
            onClose();
          } catch {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.formGroup}>
              <label htmlFor="note-title">Title</label>
              <Field
                id="note-title"
                name="title"
                type="text"
                maxLength={50}
                className={css.input}
              />
              <ErrorMessage
                name="title"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="note-content">Content</label>
              <Field
                id="note-content"
                as="textarea"
                name="content"
                rows={6}
                maxLength={500}
                className={css.textarea}
              />
              <ErrorMessage
                name="content"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="note-tag">Tag</label>
              <Field
                id="note-tag"
                as="select"
                name="tag"
                className={css.select}
              >
                <option value="Todo">Todo</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Meeting">Meeting</option>
                <option value="Shopping">Shopping</option>
              </Field>
              <ErrorMessage name="tag" component="span" className={css.error} />
            </div>

            <div className={css.actions}>
              <button
                type="button"
                onClick={onClose}
                className={css.cancelButton}
                disabled={isSubmitting}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className={css.submitButton}
              >
                {isSubmitting ? 'Creating...' : 'Create note'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
