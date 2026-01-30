

export const TestimonialCard = ({quote , author}) => {


   

  return (
    <div className="min-w-[320px] max-w-sm bg-shade rounded-2xl p-4 shadow-lg gap-2">
        <p className="text-foreground text-wrap">{quote}</p>
        <p className="text-tertiary text-sm mt-2">— {author}</p>
    </div>
  )
}
