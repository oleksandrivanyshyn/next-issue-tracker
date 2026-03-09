import { NextRequest } from 'next/server';
import { patchIssueSchema } from '@/schemas/validationSchemas';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success) {
    return Response.json(validation.error.issues, { status: 400 });
  }
  const { assignedToUserId, title, description } = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user) {
      return Response.json({ message: 'Invalid user' }, { status: 400 });
    }
  }
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!issue) {
    return Response.json({ message: 'Issue not found' }, { status: 404 });
  }
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });
  return Response.json(updatedIssue);
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
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
