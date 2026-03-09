'use client';
import React from 'react';
import { Button, Callout, Spinner, TextField } from '@radix-ui/themes';
import 'easymde/dist/easymde.min.css';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchema } from '@/schemas/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/components/ErrorMessage';
import { Issue } from '@/generated/prisma/client';
import IssueFormSkeleton from '@/app/issues/_components/IssueFormSkeleton';
import dynamic from 'next/dynamic';
import { useMutation } from '@tanstack/react-query';

type IssueFormData = z.infer<typeof issueSchema>;
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const router = useRouter();

  const {
    mutate: submitIssue,
    isPending: isSubmitting,
    error,
  } = useMutation({
    mutationFn: (data: IssueFormData) =>
      issue
        ? axios.patch(`/api/issues/${issue.id}`, data)
        : axios.post('/api/issues', data),
    onSuccess: () => {
      router.push('/issues/list');
      router.refresh();
    },
  });

  const onSubmit = handleSubmit((data) => submitIssue(data));

  return (
    <div>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>Failed to submit issue</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title"
          {...register('title')}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="description" {...field} />
          )}
        ></Controller>
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
