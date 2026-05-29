interface AnimatedStatProps {
  end: number
  suffix?: string
  prefix?: string
  decimals?: number
  label: string
}

export default function AnimatedStat({
  end,
  suffix = '',
  prefix = '',
  decimals = 0,
  label,
}: AnimatedStatProps) {
  return (
    <li className="stat-item" data-reveal-child>
      <span
        className="stat-value"
        data-count
        data-count-end={end}
        data-count-suffix={suffix}
        data-count-prefix={prefix}
        data-count-decimals={decimals}
      >
        {prefix}0{suffix}
      </span>
      <span className="stat-label">{label}</span>
    </li>
  )
}
