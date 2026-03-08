import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { issueSchema } from '@/schemas/validationSchemas';
import { auth } from '@/auth';

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json();
  const parsedBody = issueSchema.safeParse(body);
  if (!parsedBody.success) {
    return Response.json(parsedBody.error.issues, { status: 400 });
  }
  const newIssue = await prisma.issue.create({ data: parsedBody.data });
  return Response.json(newIssue, { status: 201 });
}
