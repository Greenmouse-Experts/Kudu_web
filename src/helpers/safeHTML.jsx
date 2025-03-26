import DOMPurify from "dompurify";
import { useState } from "react";

export default function SafeHTML({ htmlContent, wordLimit = 10 }) {
    const [showFullContent, setShowFullContent] = useState(false);
    
    const cleanHTML = DOMPurify.sanitize(htmlContent);
    
    const truncateHTML = (html, limit) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      let wordCount = 0;
      let truncated = false;
  
      const walkNodes = (node) => {
        Array.from(node.childNodes).forEach(child => {
          if (truncated) return;
  
          if (child.nodeType === Node.TEXT_NODE) {
            const text = child.textContent || '';
            const words = text.trim().split(/\s+/);
            
            if (wordCount + words.length > limit) {
              const remaining = limit - wordCount;
              child.textContent = words.slice(0, remaining).join(' ') + '...';
              truncated = true;
              wordCount = limit;
            } else {
              wordCount += words.length;
            }
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            walkNodes(child);
          }
        });
      };
  
      walkNodes(doc.body);
      return { 
        truncatedHTML: doc.body.innerHTML, 
        needsTruncation: truncated 
      };
    };
  
    const { truncatedHTML, needsTruncation } = truncateHTML(cleanHTML, wordLimit);
  
    return (
      <div>
        <div dangerouslySetInnerHTML={{ 
          __html: showFullContent ? cleanHTML : truncatedHTML 
        }} />
        
        {needsTruncation && (
          <button
            onClick={() => setShowFullContent(!showFullContent)}
            style={{ 
              color: '#2563eb',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: '4px 0',
              fontWeight: '600'
            }}
          >
            {showFullContent ? 'See Less' : 'See More'}
          </button>
        )}
      </div>
    );
  }