'use client';

import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-form-input";
import { z } from 'zod';
import { toast } from "sonner";
import { generatePdfSummary } from "@/actions/upload-actions";

const schema = z.object({
    file: z
    .instanceof(File, {message: 'Invalid file'})
    .refine(
        (file) => file.size <= 20 * 1024 * 1024, 'File size must be less than 20MB'
    )
    .refine((file) => file.type.startsWith('application/pdf'), 'File must be a PDF')
})


export default function UploadForm() {
    
    const { startUpload, routeConfig } = useUploadThing ('pdfUploader', {
        onClientUploadComplete: (res) => {
            console.log('uploaded successfully!',res);
        },
        onUploadError: (err) => {
            console.log('error occured while uploading', err);
            toast('Error occurred while uploading', {
                description: err.message})
        },
        onUploadBegin: ({ file }) => {
            console.log('upload has begun for', file)
        },
    })

    //schema
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const file = formData.get('file') as File;

        //validating the fields
        const validatedFields = schema.safeParse({file})

        if(!validatedFields.success) {
            
            toast('❌ Something went wrong', {
                description: validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'Invalid file',
                className: 'bg-red-500 text-white border border-red-700',
            })
            return;
        }
        toast('📄 Uploading PDF',{
            description: 'We are uploading your PDF! ',
            
        })

        //upload files to uploadthing
        const resp = await startUpload([file]);
        if (!resp) {
            toast('Something went wrong',{
                description: 'Please use a different file',
                className: 'bg-red-500 text-white border border-red-700'
            })
            return;
        }
        toast('📄 Processing PDF',{
            description: 'Hang tight! Our AI is reading through your document! ✨ ',
            
        })
        //parse the pdf using langchain
        const summary = await generatePdfSummary(resp);
        console.log({summary})
    }
    return (
        <div className="flex flex-col gap-8 w-full max-x-2xl mx-auto">
            <UploadFormInput onSubmit={handleSubmit}/>
        </div>
    )
}