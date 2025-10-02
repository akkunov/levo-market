import { NextResponse } from 'next/server'
import {S3Client, PutObjectCommand, DeleteObjectCommand} from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'

const s3 = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
})


export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        const file = formData.get('file') as File | null

        if (!file) {
            return NextResponse.json({ error: 'Файл не найден' }, { status: 400 })
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        const key = `uploads/${randomUUID()}-${file.name}`

        await s3.send(
            new PutObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME!,
                Key: key,
                Body: buffer,
                ContentType: file.type,
            })
        )

        const url = `${process.env.PUB_ENDPOINT}/${key}`

        return NextResponse.json({ url })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Ошибка при загрузке' }, { status: 500 })
    }
}


export async function DELETE(req: Request) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: "URL не указан" }, { status: 400 });
        }

        // Получаем ключ объекта из полного URL
        const bucketUrl = process.env.PUB_ENDPOINT!;
        const key = url.replace(`${bucketUrl}/`, "");

        await s3.send(
            new DeleteObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME!,
                Key: key,
            })
        );

        return NextResponse.json({ message: "Файл удалён" });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Ошибка при удалении файла" }, { status: 500 });
    }
}
