import React from "react";

export default function DesenhoProduto({
  tipo,
  cor = "#d4d9cc",
  grande = false,
}) {
  const escuro = "#263548";
  return (
    <svg
      viewBox="0 0 320 240"
      className={grande ? "desenho grande" : "desenho"}
      aria-hidden="true"
    >
      <ellipse cx="160" cy="209" rx="91" ry="12" fill="#153a58" opacity=".12" />
      <g transform={tipo === "figura2" ? "rotate(-5 160 120)" : tipo === "figura3" ? "rotate(5 160 120)" : ""}>
        {tipo === "figura2" && (
          <path d="M108 87 Q69 125 82 195 L131 179 L151 99Z" fill={escuro} opacity=".9" />
        )}
        {tipo === "figura3" && (
          <path d="M111 83 L91 64 L126 68 L142 45 L160 66 L184 48 L190 75 L217 70 L201 99Z" fill={escuro} />
        )}
        <path d="M121 105 L94 139 L108 181" fill="none" stroke={escuro} strokeWidth="18" strokeLinecap="round" />
        <path d="M199 105 L224 137 L208 174" fill="none" stroke={escuro} strokeWidth="18" strokeLinecap="round" />
        <path d="M136 151 L127 199 L149 204 L163 163 L174 204 L197 199 L185 151Z" fill={escuro} />
        <path d="M128 93 L111 111 L126 158 Q160 174 194 158 L210 111 L192 93 L178 84 L142 84Z" fill={cor} stroke={escuro} strokeWidth="7" strokeLinejoin="round" />
        <path d="M142 87 Q160 70 178 87 L186 104 L174 119 L146 119 L134 104Z" fill={escuro} />
        <circle cx="160" cy="62" r="31" fill={escuro} />
        <path d="M137 59 Q143 31 164 30 Q185 34 188 59 Q174 50 161 51 Q148 51 137 59Z" fill={cor} />
        <path d="M147 66 H154 M167 66 H174" stroke={cor} strokeWidth="4" strokeLinecap="round" />
        <path d="M150 80 Q160 86 170 80" fill="none" stroke={cor} strokeWidth="3" strokeLinecap="round" />
        <path d="M138 111 L160 130 L182 111 M160 130 V159" fill="none" stroke={escuro} strokeWidth="5" />
        <path d="M127 199 L119 213 H151 L154 204 M174 204 L179 213 H211 L197 199" fill={escuro} />
        <path d="M103 134 L91 154 M218 135 L230 154" stroke={cor} strokeWidth="8" strokeLinecap="round" />
      </g>
    </svg>
  );
}
