'use client';
import React from 'react';
import { Button, TextField } from '@radix-ui/themes';
import 'easymde/dist/easymde.min.css';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

interface IssueForm {
  title: string;
  description: string;
}
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});
const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();
  return (
    <form
      className="max-w-xl space-y-3 mx-auto"
      onSubmit={handleSubmit(async (data) => {
        await axios.post('/api/issues', data);
        router.push('/issues');
      })}
    >
      <TextField.Root placeholder="Title" {...register('title')} />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="description" {...field} />
        )}
      ></Controller>
      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
