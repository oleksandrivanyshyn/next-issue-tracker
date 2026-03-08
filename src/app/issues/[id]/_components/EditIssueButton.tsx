import React from 'react';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Button } from '@radix-ui/themes';

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button asChild>
      <Link href={`/issues/${issueId}/edit`}>
        <Pencil2Icon />
        <span>Edit Issue</span>
      </Link>
    </Button>
  );
};

export default EditIssueButton;
