from paddleocr import PaddleOCR
import cv2
import sys
import json

def ocr_image(path_to_image: str):
    try:
        ocr = PaddleOCR(
            use_angle_cls=True,
            lang="ch",
            use_gpu=False,
            enable_mkldnn=False,
            show_log=False
        )

        img = cv2.imread(path_to_image)
        if img is None:
            print(json.dumps({"error": f"Could not load image at {path_to_image}"}), file=sys.stderr)
            sys.exit(1)

        result = ocr.ocr(img, cls=True)
        
        lines = []
        if result and result[0] is not None: 
            for page_layout in result:
                if page_layout:
                    for line_info in page_layout:
                        if line_info:
                            bbox, text_score_tuple = line_info
                            text, score = text_score_tuple
                            
                            lines.append({
                                "text": text,
                                "confidence": float(score),
                                "bbox": [[int(p[0]), int(p[1])] for p in bbox]
                            })
        
        if lines:
            lines = sorted(lines, key=lambda x: x["bbox"][0][1])

        print(json.dumps(lines))

    except Exception as e:
        print(json.dumps({"error": f"Error during OCR processing: {str(e)}"}), file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Usage: python ocr_processor.py /path/to/image.jpg"}), file=sys.stderr)
        sys.exit(1)
    
    image_path_arg = sys.argv[1]
    ocr_image(image_path_arg)
