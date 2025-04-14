interface HeadingProps {
    title: string
    description?: string
    className?: string
    descriptionClassName?: string
}

export function Heading({ title, description, className = "", descriptionClassName = "" }: HeadingProps) {
    return (
        <div>
            <h1 className={className}>{title}</h1>
            {description && <p className={descriptionClassName}>{description}</p>}
        </div>
    )
}

