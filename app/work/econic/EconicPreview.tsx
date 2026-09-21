'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './EconicPreview.module.css';

const ASSETS = '/work/econic/redesign';
const money = (value: number) => `₹${value.toLocaleString('en-IN')}`;

// Illustrative bag using prices from the supplied ’25 product and cart designs.
const products = [
  { name: 'Niki', image: 'demo-niki', current: 1790, fair: 690, detail: 'Garment' },
  { name: 'Astrid', image: 'demo-astrid', current: 2100, fair: 1290, detail: 'Garment' },
  { name: 'Raya', image: 'demo-raya', current: 600, fair: 250, detail: 'Perfume · 50 ml' },
] as const;
const currentTotal = products.reduce((sum, product) => sum + product.current, 0);
const fairTotal = products.reduce((sum, product) => sum + product.fair, 0);
const niki = products[0];

function Price({ amount, preview, className = '' }: { amount: number; preview: boolean; className?: string }) {
  return <span className={`${styles.priceBadge} ${className}`} data-preview={preview}>{money(amount)}</span>;
}

/** Recreates the three-card explainer with ’25 artwork, pricing and pre-sale behaviour. */
export default function EconicPreview() {
  const [preview, setPreview] = useState(false);
  const togglePreview = () => setPreview(value => !value);

  return (
    <div className={styles.canvas} data-preview={preview}>
      <div className={styles.widgetHeader}>
        <span className={styles.promise}>Zero margins. Zero markup.</span>
        <h3>How it works</h3>
      </div>
      <div className={styles.cards} role="group" aria-label="Econic ’25 interactive demo: price preview, cost breakdown and shopping bag" tabIndex={0}>
        <div className={styles.card}>
          <div className={styles.intro}>
            <h4>Preview Eco-nic prices</h4>
            <p>Flip the switch to see cost-to-make prices before the fair begins.</p>
          </div>
          <div className={styles.bar}>
            <Image className={styles.logo} src={`${ASSETS}/demo-logo.webp`} width={125} height={84} alt="Eco-nic Fair ’25" unoptimized />
            <div className={styles.control}>
              <span id="preview-label" className={styles.label}>Preview<span>Cost to make</span></span>
              <button className={styles.switch} type="button" role="switch" aria-checked={preview}
                aria-labelledby="preview-label" aria-controls="price-state cost-breakdown bag-preview" onClick={togglePreview}>
                <span className={styles.track}><span className={styles.thumb} /></span>
              </button>
            </div>
          </div>
          <div className={styles.product}>
            <div className={styles.productLines} aria-hidden="true"><span /><span /></div>
            <div id="price-state" className={styles.priceState}>
              <Price amount={preview ? niki.fair : niki.current} preview={preview} className={styles.heroPrice} />
              <span className={styles.caption}>{preview ? `${money(niki.current)} today` : 'Today’s price'}</span>
            </div>
            <div className={styles.productOptions} aria-hidden="true">
              <div><span /><i /></div><div><i /><i /><i /></div>
            </div>
          </div>
        </div>
        <div className={`${styles.card} ${styles.breakdownCard}`}>
          <div className={styles.stackStage}>
            <div className={styles.pricingStack}>
              <div className={styles.pricingPanel} id="cost-breakdown">
                <div className={styles.itemHeading}>
                  <div><span className={styles.itemName}>Niki</span><span className={styles.itemDetail}>Fair pricing</span></div>
                  <Image src={`${ASSETS}/demo-niki.webp`} width={265} height={450} alt="Niki floral dress" unoptimized />
                </div>
                <div className={styles.breakdownPrice}>
                  <Price amount={preview ? niki.fair : niki.current} preview={preview} />
                  <span>{preview ? `${money(niki.current)} today` : 'VIRGIO price'}</span>
                </div>
                <div className={styles.costBar} aria-hidden="true"><span /><span /><span /></div>
                <dl className={styles.costs}>
                  <div className={styles.makingCost}><dt>Cost to make<small>Fabric, trims, stitching, taxes</small></dt><dd>{money(690)}</dd></div>
                  <div className={styles.excludedCost}><dt>Serving cost<small>Packing, logistics, gateway charges</small></dt><dd>{money(700)}</dd></div>
                  <div className={styles.excludedCost}><dt>Others<small>Profits, marketing, rent</small></dt><dd>{money(400)}</dd></div>
                </dl>
                <span className={styles.priceAvailability}>{preview ? 'Fair price · Nov 7–9' : 'Know what goes into the price'}</span>
              </div>
            </div>
          </div>
          <div className={`${styles.intro} ${styles.breakdownIntro}`}>
            <h4>See the cost to make</h4>
            <p>The fair price covers making costs. Serving cost and other costs are taken out.</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.intro}>
            <h4>Build your bag early</h4>
            <p>Preview your bag’s total now. Shop at these prices when the fair opens.</p>
          </div>
          <div className={styles.bag} id="bag-preview">
            <ul className={styles.bagItems}>
              {products.map(product => (
                <li key={product.name}>
                  <Image src={`${ASSETS}/${product.image}.webp`} width={60} height={76} alt={product.name === 'Raya' ? 'Raya perfume' : `${product.name} dress`} unoptimized />
                  <div className={styles.bagItemCopy}><span className={styles.itemName}>{product.name}</span><span className={styles.itemDetail}>{product.detail}</span></div>
                  <Price amount={preview ? product.fair : product.current} preview={preview} className={styles.bagPrice} />
                </li>
              ))}
            </ul>
            <div className={styles.bagTotal}>
              <div><span>Eco-nic Fair ’25</span><span className={styles.totalLabel}>Bag total</span></div>
              <Price amount={preview ? fairTotal : currentTotal} preview={preview} className={styles.totalPrice} />
            </div>
            <span className={styles.bagCaption}>{preview ? `Today’s bag total: ${money(currentTotal)}` : 'Example bag · 3 items'}</span>
          </div>
        </div>
      </div>
      <div className={styles.demoFooter}>
        <button type="button" className={styles.previewAction} onClick={togglePreview} aria-controls="price-state cost-breakdown bag-preview">
          {preview ? 'End preview' : 'Preview fair prices'}
        </button>
      </div>
      <span className={styles.srOnly} role="status" aria-live="polite" aria-atomic="true">
        {preview ? `Preview on. Niki costs ${money(niki.fair)}. The example bag’s fair total is ${money(fairTotal)}. Available November 7–9.` : `Preview off. Niki costs ${money(niki.current)} today. The example bag totals ${money(currentTotal)}.`}
      </span>
    </div>
  );
}
