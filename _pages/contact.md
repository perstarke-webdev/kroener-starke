---
title: "Kontakt"
permalink: /kontakt/
description: "Projekt anfragen bei Kröner & Starke oder direkt mit einem kostenlosen Website-Check starten."
noindex: true
classes:
  - contact-page
---
{% assign home = site.data.homepage %}
{% assign contact = site.data.contact_page %}

<section class="hero-section contact-page__hero">
  <div class="shell hero-section__inner contact-page__hero-inner">
    <div class="hero-section__copy contact-page__hero-copy">
      <p class="section-label section-label--hero">{{ contact.hero.label }}</p>
      <h1>{{ contact.hero.title }}</h1>
      <p class="hero-section__subtitle">{{ contact.hero.subtitle }}</p>
      <p class="hero-section__support">{{ contact.hero.support }}</p>
    </div>
  </div>
</section>

<section class="section section--cream contact-page__main">
  <div class="shell section-grid contact-page__grid">
    <div class="contact-page__form-card">
      {% include contact_project_form.html id_prefix="contact" form=contact.form context="contact-page" %}
    </div>

    <div class="contact-page__aside">
      <div class="audit-card audit-card--dark contact-page__audit-card">
        <p class="section-label section-label--light">{{ contact.analysis.label }}</p>
        <h3>{{ contact.analysis.title }}</h3>
        <p>{{ contact.analysis.text }}</p>
        {% include site_check_form.html id_prefix="contact-check" form=home.pain.form context="contact-check" variant="dark" %}
      </div>

      <div class="contact-page__direct-card">
        <h3>{{ contact.direct.title }}</h3>
        <p>{{ contact.direct.intro }}</p>
        <div class="contact-page__direct-links">
          <a class="site-footer__link" href="mailto:{{ site.contact.email }}">{{ site.contact.email }}</a>
          <a class="site-footer__link" href="tel:{{ site.contact.phone | replace: ' ', '' }}">{{ site.contact.phone }}</a>
        </div>
      </div>
    </div>
  </div>
</section>
