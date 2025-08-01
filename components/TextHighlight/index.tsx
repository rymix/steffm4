import React from "react";

interface TextHighlightProps {
  textToHighlight: string;
  searchWords: string[];
  autoEscape?: boolean;
  highlightClassName?: string;
  highlightStyle?: React.CSSProperties;
  className?: string;
}

const TextHighlight: React.FC<TextHighlightProps> = ({
  textToHighlight,
  searchWords,
  autoEscape = true,
  highlightClassName = "",
  highlightStyle = { backgroundColor: "yellow", fontWeight: "bold" },
  className = "",
}) => {
  if (!textToHighlight || searchWords.length === 0) {
    return <span className={className}>{textToHighlight}</span>;
  }

  const escapeRegExp = (string: string): string => {
    return autoEscape ? string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") : string;
  };

  const getHighlightedText = (text: string, highlight: string[]): React.ReactNode[] => {
    if (!highlight.length || !text) return [text];
    
    const filteredHighlight = highlight.filter(word => word && word.trim());
    if (!filteredHighlight.length) return [text];

    const regex = new RegExp(
      `(${filteredHighlight.map(escapeRegExp).join("|")})`,
      "gi"
    );

    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      const isHighlight = filteredHighlight.some(word => 
        part.toLowerCase() === word.toLowerCase()
      );
      
      return isHighlight ? (
        <mark
          key={index}
          className={highlightClassName}
          style={highlightStyle}
        >
          {part}
        </mark>
      ) : (
        part
      );
    });
  };

  return (
    <span className={className}>
      {getHighlightedText(textToHighlight, searchWords)}
    </span>
  );
};

export default TextHighlight;