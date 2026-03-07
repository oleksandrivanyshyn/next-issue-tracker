import React from 'react';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

interface IssueDetailPageProps {
  params: Promise<{ id: string }>;
}
const IssueDetailPage = async ({ params }: IssueDetailPageProps) => {
  const { id } = await params;
  let issue;
  try {
    issue = await prisma.issue.findUniqueOrThrow({
      where: { id: parseInt(id) },
    });
  } catch (error) {
    return notFound();
  }
  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  );
};

export default IssueDetailPage;
