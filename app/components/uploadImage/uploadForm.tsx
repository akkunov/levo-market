"use client";


import {ChangeEvent, FormEvent, useState} from 'react';
import Image from "next/image";

export function UploadImage() {
    const [image, setImage] = useState<File | null >(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);


    const handleSubmit = async  (e: FormEvent) => {
        e.preventDefault();
        console.log(e.target);
        console.log(image)
        try {
            setUploading(true)
            const formData = new FormData()
            if (!image) {
                return;
            }
            formData.append('file', image)

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            if (!res.ok) {
                console.log('Ошибка при загрузке')
                return
            }

            const { url } = await res.json()
            console.log(url)
        } catch (err) {
            console.log('Не удалось загрузить файл', err)
        } finally {
            setUploading(false)
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file =e.target.files?.[0] || null;
        setImage(file)
        console.log(e.target.files?.[0])

        if (file){
            setPreview(URL.createObjectURL(file));
            console.log(preview)
        } else {
            setPreview(null);
            console.log(preview);
        }
    }


    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md max-w-sm">
            <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="block w-full text-sm text-gray-600"
            />
            <button type={'submit'} className={`p-4 border-[1px] bg-black text-white px-12`}>
                {uploading ? 'Загрузка...' : 'Загрузить'}
            </button>

            {preview && (
                <div className="w48 h-48 relative">
                    <Image src={preview} alt={`preview photo`} fill className="object-contain" />
                </div>
            )}
        </form>
    )
}