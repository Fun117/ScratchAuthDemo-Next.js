export function Main({ children, className }: { children: React.ReactNode, className?: string}) {
    return (
        <>
            <main className={`w-full min-h-screen h-full ${className? className:''}`}>
                {children}
            </main>
        </>
    )
}