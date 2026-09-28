import styles from '@/app/work/checkout/checkout.module.css';

type Props = {
  title?: string;
  body: string;
  emphasis?: string;
};

export default function CaseStudyLearnings({ title = 'Key learnings', body, emphasis }: Props) {
  const start = emphasis ? body.indexOf(emphasis) : -1;

  return (
    <section id="learnings" tabIndex={-1} className={`${styles.section} ${styles.learnings}`} aria-labelledby="learnings-title">
      <h2 data-case-reveal="text" id="learnings-title">{title}</h2>
      <p className={styles.prose}>
        {emphasis && start >= 0
          ? <>{body.slice(0, start)}<strong>{emphasis}</strong>{body.slice(start + emphasis.length)}</>
          : body}
      </p>
    </section>
  );
}
