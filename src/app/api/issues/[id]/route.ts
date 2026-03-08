import { NextRequest } from 'next/server';
import { issueSchema } from '@/schemas/validationSchemas';
import prisma from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success) {
    return Response.json(validation.error.issues, { status: 400 });
  }
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!issue) {
    return Response.json({ message: 'Issue not found' }, { status: 404 });
  }
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: validation.data,
  });
  return Response.json(updatedIssue);
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = parseInt((await params).id);
  const issue = await prisma.issue.findUnique({
    where: { id },
  });
  if (!issue) {
    return Response.json({ message: 'Issue not found' }, { status: 404 });
  }
  await prisma.issue.delete({ where: { id } });
  return Response.json({});
}
