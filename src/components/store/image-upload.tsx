"use client"

import { CldUploadWidget } from 'next-cloudinary';
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { ImageIcon, Upload } from 'lucide-react';
import Image from 'next/image';

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
        <>
            {value &&
                <div className="space-y-4">
                    <div className="relative mx-auto w-40 h-40">
                        <Image
                            src={value || "/placeholder.svg"}
                            alt="Category thumbnail"
                            className="w-full h-full object-cover rounded-lg border border-[#1E293B]"
                            fill
                        />
                        <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2 bg-[#FF3D00] hover:bg-[#FF3D00]/90 cursor-pointer"
                            onClick={() => onRemove(value)}
                        >
                            Remove
                        </Button>
                    </div>
                </div>
            }
            {!value &&
                < CldUploadWidget onSuccess={onUpload} uploadPreset='uklsasla'>
                    {({ open }) => {
                        const onClick = () => {
                            open();
                        }
                        return (
                            <>
                                <div className="border-2 border-dashed border-[#1E293B] rounded-lg p-6 text-center">
                                    <div className="mx-auto w-16 h-16 rounded-full bg-[#FF00E5]/10 flex items-center justify-center mb-4">
                                        <ImageIcon className="h-8 w-8 text-[#FF00E5]" />
                                    </div>
                                    <h3 className="text-lg font-medium mb-2">Drag and drop your image here</h3>
                                    <p className="text-sm text-[#A4B8D3] mb-4">Supports JPG, PNG and SVG. Maximum file size 2MB.</p>
                                </div>
                                <Button
                                    type='button' disabled={disabled}
                                    className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)] cursor-pointer"
                                    onClick={onClick}
                                >
                                    <Upload className="h-4 w-4 mr-2" />
                                    Upload Image
                                </Button>
                            </>
                        )
                    }}
                </CldUploadWidget >
            }
        </>
    )
}

export default ImageUpload