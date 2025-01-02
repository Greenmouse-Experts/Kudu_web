"use client";

import React from 'react';
import { useDropzone } from 'react-dropzone';

export default function Dropzone({ onDrop }) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*,application/pdf', // customize accepted file types
    });

    return (
        <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-4 w-full h-40 flex items-center justify-center transition ${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-100'
                }`}
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p className="text-blue-500">Drop the files here ...</p>
            ) : (
                <p className="text-gray-500">Drag and drop files here, or click to select files</p>
            )}
        </div>
    );
}