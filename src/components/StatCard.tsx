import React from 'react';

interface StatCardProps {
    title?: string;
    children: React.ReactNode;
    className?: string; // Correctly allow className
}

export default function StatCard({ title, children, className = "" }: StatCardProps) {
    return (
        <section className={`bg-white rounded-2xl shadow p-5 ${className}`}>
            {title && <h2 className="text-lg font-semibold mb-3">{title}</h2>}
            {children}
        </section>
    );
}
