import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const createPostSchema = z.object({
    title: z.string({ required_error: ' Title is required' }).trim()
        .min(2, { message: 'Title should have between 2 and 200 chracters.' })
        .max(200, { message: 'Title should have between 2 and 200 chracters.' }),

    content: z.string({ required_error: ' Content is required' }).trim()
        .min(2, { message: 'Content should have between 2 and 5000 chracters.' })
        .max(5000, { message: 'Content should have between 2 and 5000 chracters.' }),

    author: z.string({
        required_error: 'Author is required',
        invalid_type_error: 'Author must be a string'
    }).toLowerCase().trim()
        .max(200, { message: 'Author name cannot exceed 200 chracters.' }),
});

const updatePostSchema = createPostSchema.partial();

const idParamSchema = z.object({
    id: z.number({
        invalid_type_error: 'Post id must be a number',
        required_error: 'Post id is requires',
    }).min(1, { message: 'Post id must be an integer not less than 1' })
})

const getPostsQuerySchema = z.object({
    page: z.number({ invalid_type_error: 'Page must be a number', })
        .min(1, { message: 'Page must be an integer not less than 1' })
        .optional(),

    limit: z.number({invalid_type_error: 'Limit must be a number', })
    .min(1, { message: 'Limit must be an integer not less than 1' })
    .optional()
})

export type CreatePostType = z.infer<typeof createPostSchema>
export type UpdatePostType = z.infer<typeof updatePostSchema>
export type GetPostsType = z.infer<typeof getPostsQuerySchema>

export const { schemas: postSchema, $ref } = buildJsonSchemas({
    createPostSchema,
    updatePostSchema,
    idParamSchema,
    getPostsQuerySchema
});