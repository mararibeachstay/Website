import { motion } from 'framer-motion'
import './SectionTitle.css'

/**
 * Reusable eyebrow + heading pattern used to introduce each homepage section.
 * accent: the italic gold word/phrase within the heading
 */
function SectionTitle({ icon, eyebrow, heading, accent, align = 'left', light = false }) {
  return (
    <motion.div
      className={`section-title ${align === 'center' ? 'section-title--center' : ''} ${light ? 'section-title--light' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="section-title__eyebrow">
        {icon && <span className="section-title__icon">{icon}</span>}
        {eyebrow}
      </span>
      <h2 className="section-title__heading">
        {heading} {accent && <span className="italic-accent">{accent}</span>}
      </h2>
    </motion.div>
  )
}

export default SectionTitle
