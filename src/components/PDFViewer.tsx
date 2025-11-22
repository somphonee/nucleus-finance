import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, X, ZoomIn, ZoomOut } from 'lucide-react';

interface PDFViewerProps {
    open: boolean;
    onClose: () => void;
    pdfUrl: string;
    title: string;
    onDownload?: () => void;
}

export function PDFViewer({ open, onClose, pdfUrl, title, onDownload }: PDFViewerProps) {
    const [zoom, setZoom] = useState(100);

    const handleZoomIn = () => {
        setZoom((prev) => Math.min(prev + 25, 200));
    };

    const handleZoomOut = () => {
        setZoom((prev) => Math.max(prev - 25, 50));
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-6xl h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 py-4 border-b">
                    <div className="flex items-center justify-between">
                        <DialogTitle>{title}</DialogTitle>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleZoomOut}
                                disabled={zoom <= 50}
                            >
                                <ZoomOut className="h-4 w-4" />
                            </Button>
                            <span className="text-sm font-medium min-w-[60px] text-center">
                                {zoom}%
                            </span>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleZoomIn}
                                disabled={zoom >= 200}
                            >
                                <ZoomIn className="h-4 w-4" />
                            </Button>
                            {onDownload && (
                                <Button variant="outline" onClick={onDownload}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                </Button>
                            )}
                            <Button variant="ghost" size="icon" onClick={onClose}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </DialogHeader>
                <div className="flex-1 overflow-auto bg-gray-100 p-4">
                    <div className="flex justify-center">
                        <iframe
                            src={pdfUrl}
                            className="bg-white shadow-lg"
                            style={{
                                width: `${zoom}%`,
                                height: '100%',
                                minHeight: '800px',
                                border: 'none',
                            }}
                            title={title}
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
