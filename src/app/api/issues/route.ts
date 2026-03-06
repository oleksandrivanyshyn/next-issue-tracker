import { NextRequest } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';

const createIssueSchema = z.object({
  title: z.string().min(1, 'Title is required. ').max(255),
  description: z.string().min(1, 'Description is required. '),
});
export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsedBody = createIssueSchema.safeParse(body);
  if (!parsedBody.success) {
    return Response.json(parsedBody.error.issues, { status: 400 });
  }
  const newIssue = await prisma.issue.create({ data: parsedBody.data });
  return Response.json(newIssue, { status: 201 });
}
