"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string;
};

const ImageUpload = ({
    disabled,
    onChange,
    onRemove,
    value,
}: ImageUploadProps) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    }

    if (!isMounted) return null;

    return (
        <div className=''>
            <div className='mb-4 flex items-center gap-4'>
                {value &&
                    <div key={value} className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
                        <div className='z-10 absolute top-2 right-2'>
                            <Button type='button' onClick={() => onRemove(value)} variant='destructive' size='icon'>
                                <Trash className='h-4 w-4' />
                            </Button>
                        </div>
                        <Image
                            src={value}
                            fill
                            className='object-cover'
                            alt='image'
                        />
                    </div>
                }
            </div>
            <CldUploadWidget onSuccess={onUpload} uploadPreset='uklsasla'>
                {({ open }) => {
                    const onClick = () => {
                        open();
                    }
                    return (
                        <Button type='button' disabled={disabled} variant='secondary' onClick={onClick}>
                            <ImagePlus className='h-4 w-4 mr-2' />
                            Upload an Image
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    )
}

export default ImageUpload