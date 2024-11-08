type HeaderProps = {
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
};

export default function Header({ title, subtitle, children }: HeaderProps) {
    return (
        <div className="header">
            <div className="header-content">
                <div>
                    <h1 className="header-title">{title}</h1>
                    {subtitle && <p className="header-subtitle">{subtitle}</p>}
                </div>
                <div className="header-actions">
                    {children}
                </div>
            </div>
        </div>
    );
} 