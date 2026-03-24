---
title: "Projekte"
permalink: /projekte/
description: "Einblick in die Arbeit von Kröner & Starke: Websites, die nicht nur gut aussehen, sondern Ergebnisse bringen."
classes:
  - portfolio-page
---
{% assign home = site.data.homepage %}
{% assign projects = site.data.projects %}

<section class="hero-section portfolio-page__hero">
  <div class="shell hero-section__inner portfolio-page__hero-inner">
    <div class="hero-section__copy portfolio-page__hero-copy">
      <p class="section-label section-label--hero"><span class="status-dot" aria-hidden="true"></span>Unsere zufriedenen Kund:innen</p>
      <h1>Einblick in unsere Arbeit</h1>
      <p class="hero-section__subtitle">Websites, die nicht nur gut aussehen, sondern Ergebnisse bringen.</p>
      <p class="hero-section__support">Jedes Projekt folgt derselben Logik: Vertrauen aufbauen, Klarheit schaffen und Anfragen generieren.</p>
    </div>
  </div>
</section>

<section class="section section--cream portfolio-page__grid-section">
  <div class="shell">
    {% include project_showcase.html projects=projects dialog_prefix="projects-page" %}
  </div>
</section>

<section class="section section--deep section--cta portfolio-page__cta" id="cta">
  <div class="shell cta-grid">
    <div class="section-copy">
      <h2>{{ home.final_cta.title }}</h2>
      <p class="section-lead section-lead--light">{{ home.final_cta.text }}</p>
      <a class="button button--light" href="{{ home.final_cta.primary_cta.url | relative_url }}">{{ home.final_cta.primary_cta.label }}</a>
    </div>

    <div class="audit-card audit-card--dark">
      <h3>{{ home.pain.audit_title }}</h3>
      <p>{{ home.pain.audit_text }}</p>
      {% include site_check_form.html id_prefix="projects-check" form=home.pain.form context="projects-check" variant="dark" %}
    </div>
  </div>
</section>
