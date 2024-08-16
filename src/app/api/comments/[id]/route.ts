import prisma from "@/utils/db";
import { UpdateCommentDTO } from "@/utils/dtos";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

/**
 * @method PUT
 * @route ~/api/comments/:id
 * @desc Update a comment
 * @access private(Only owner himself)
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }
    const user = verifyToken(request);
    if (user === null || user.id !== comment.userId) {
      return NextResponse.json(
        { message: "You are not allowed, access denied" },
        { status: 403 }
      );
    }
    const body = (await request.json()) as UpdateCommentDTO;
    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(params.id) },
      data: {
        text: body.text,
      },
    });
    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}


/**
 * @method DELETE
 * @route ~/api/comments/:id
 * @desc Delete a comment
 * @access private(Only owner himself, or admin)
 */
export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        const comment = await prisma.comment.findUnique({ where: { id: parseInt(params.id) } });
        if(!comment) {
            return NextResponse.json({ message: "Comment not found"}, { status: 404 });
        }
        const user = verifyToken(request);
        if(user === null) {
            return NextResponse.json({ message: "No token provided, access denied"}, { status: 403 });
        }
        if(user.isAdmin === true || user.id === comment.userId) {
            await prisma.comment.delete({ where: { id: parseInt(params.id) } });
            return NextResponse.json({ message: "Comment deleted successfully"}, { status: 200 });
        }
        return NextResponse.json({ message: "You are not allowed, access denied"}, { status: 403 });
    } catch(error) {
        return NextResponse.json({ message: "Internal server error"}, { status: 500 });
    }
}