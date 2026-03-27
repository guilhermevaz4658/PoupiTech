import { z } from "zod"

export const createUserDTO = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    senha: z.string().min(5, "Senha deve ter no mínimo 5 caracteres")
})

//usando biblioteca Z para validação de campos
export const updateUserDTO = z.object({
    nome: z.string().min(1).optional(),
    email: z.string().email().optional(),
    senha: z.string().min(6).optional()
}).refine(data => Object.keys(data).length > 0, { message: "Envie pelo menos um campo para atualizar" })
