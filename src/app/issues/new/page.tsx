'use client';
import React, { useState } from 'react';
import { Button, Callout, TextField } from '@radix-ui/themes';
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
  const [error, setError] = useState('');
  return (
    <div>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="max-w-xl space-y-3 mx-auto"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error: unknown) {
            setError('Failed to create issue');
          }
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
    </div>
  );
};

export default NewIssuePage;
