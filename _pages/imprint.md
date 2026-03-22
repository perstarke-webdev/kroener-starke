---
title: "Impressum"
permalink: /impressum/
description: "Impressum für den gemeinsamen Auftritt von Simon Kröner und Per Starke."
classes:
  - legal-page
---
{% assign legal = site.data.legal %}
{% assign simon = legal.simon %}
{% assign per = legal.per %}

<section class="hero-section legal-page__hero">
  <div class="shell hero-section__inner legal-page__hero-inner">
    <div class="hero-section__copy legal-page__hero-copy">
      <p class="section-label section-label--hero">Rechtliches</p>
      <h1>Impressum</h1>
      <p class="hero-section__subtitle">Anbieterkennzeichnung und rechtliche Hinweise für den gemeinsamen Auftritt von Simon Kröner und Per Starke.</p>
    </div>
  </div>
</section>

<section class="section section--cream legal-page__body">
  <div class="shell legal-page__grid">
    <aside class="legal-page__aside">
      <div class="legal-page__aside-card">
        <p class="section-label section-label--dark">Schnellnavigation</p>
        <ul class="legal-page__anchor-list">
          <li><a href="#anbieter">Anbieter</a></li>
          <li><a href="#kontakt">Kontakt</a></li>
          <li><a href="#verantwortung">Verantwortung</a></li>
          <li><a href="#haftung">Haftungsausschluss</a></li>
          <li><a href="#links">Externe Links</a></li>
          <li><a href="#urheberrecht">Urheberrecht</a></li>
          <li><a href="#aenderungen">Änderungsvorbehalt</a></li>
        </ul>
      </div>

      <div class="legal-page__aside-card legal-page__aside-card--soft">
        <h3>Direkter Kontakt</h3>
        <p>Für rechtliche Rückfragen erreichst du uns direkt über diese Kontaktwege.</p>
        <a class="site-footer__link" href="mailto:{{ simon.email }}">{{ simon.email }}</a>
        <a class="site-footer__link" href="tel:{{ simon.phone | replace: ' ', '' }}">{{ simon.phone }}</a>
        <a class="site-footer__link" href="mailto:{{ per.email }}">{{ per.display_email }}</a>
        <a class="site-footer__link" href="tel:{{ per.phone | replace: ' ', '' }}">{{ per.phone }}</a>
      </div>
    </aside>

    <div class="legal-page__content">
      <section class="legal-section" id="anbieter">
        <h2>Anbieter</h2>
        <p>{{ legal.operator_name }} ist ein gemeinsamer Auftritt von {{ simon.name }} und {{ per.name }}. Angaben zu den verantwortlichen Personen und Unternehmen:</p>
        <div class="legal-entity-grid">
          <article class="legal-entity-card">
            <p class="section-label section-label--dark">Schweizer Vertragspartner</p>
            <h3>{{ simon.business_name }}</h3>
            <p>{{ simon.name }}<br>{{ simon.address_line_1 }}<br>{{ simon.postal_city }}<br>{{ simon.country }}</p>
            <p>E-Mail: <a href="mailto:{{ simon.email }}">{{ simon.email }}</a><br>Telefon: <a href="tel:{{ simon.phone | replace: ' ', '' }}">{{ simon.phone }}</a><br>Website: <a href="{{ simon.website }}" target="_blank" rel="noopener noreferrer">{{ simon.website | replace: 'https://', '' }}</a></p>
          </article>
          <article class="legal-entity-card">
            <p class="section-label section-label--dark">Technischer Umsetzungspartner</p>
            <h3>{{ per.business_name }}</h3>
            <p>{{ per.name }}<br>{{ per.address_line_1 }}<br>{{ per.postal_city }}<br>{{ per.country }}</p>
            <p>E-Mail: <a href="mailto:{{ per.email }}">{{ per.display_email }}</a><br>Telefon: <a href="tel:{{ per.phone | replace: ' ', '' }}">{{ per.phone }}</a><br>Website: <a href="{{ per.website }}" target="_blank" rel="noopener noreferrer">{{ per.website | replace: 'https://', '' }}</a></p>
          </article>
        </div>
        <p class="legal-callout">Wer im konkreten Projekt als Vertragspartner, Rechnungssteller oder primär verantwortliche Person auftritt, ergibt sich aus dem jeweiligen Angebot, Vertrag oder der schriftlichen Projektfreigabe.</p>
      </section>

      <section class="legal-section" id="kontakt">
        <h2>Kontakt</h2>
        <div class="legal-inline-links">
          <a href="mailto:{{ simon.email }}">{{ simon.email }}</a>
          <a href="tel:{{ simon.phone | replace: ' ', '' }}">{{ simon.phone }}</a>
          <a href="mailto:{{ per.email }}">{{ per.display_email }}</a>
          <a href="tel:{{ per.phone | replace: ' ', '' }}">{{ per.phone }}</a>
          <a href="{{ per.website }}" target="_blank" rel="noopener noreferrer">{{ per.website | replace: 'https://', '' }}</a>
          <a href="{{ legal.site_url }}" target="_blank" rel="noopener noreferrer">{{ legal.site_url | replace: 'https://', '' }}</a>
        </div>
      </section>

      <section class="legal-section" id="verantwortung">
        <h2>Verantwortung</h2>
        <ul class="legal-meta-list">
          <li><strong>{{ simon.name }}</strong> verantwortet vertriebliche, strategische und vertragliche Themen über {{ simon.business_name }}.</li>
          <li><strong>{{ per.name }}</strong> verantwortet technische Umsetzung, Entwicklung und operative Web-Implementierung über {{ per.business_name }}.</li>
        </ul>
      </section>

      <section class="legal-section" id="haftung">
        <h2>Haftungsausschluss</h2>
        <h3>Inhalte dieser Website</h3>
        <p>Die Inhalte dieses Webauftritts wurden mit grösstmöglicher Sorgfalt erstellt. Wir übernehmen jedoch keine Gewähr für Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Informationen.</p>
      </section>

      <section class="legal-section" id="links">
        <h2>Externe Links</h2>
        <p>Diese Website enthält Links zu externen Webseiten Dritter. Auf deren Inhalte haben wir keinen Einfluss. Für die Inhalte verlinkter Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich. Werden Rechtsverletzungen bekannt, entfernen wir solche Links umgehend.</p>
      </section>

      <section class="legal-section" id="urheberrecht">
        <h2>Urheberrecht</h2>
        <p>Die durch uns erstellten Inhalte, Texte, Konzepte, Designs und Werke auf dieser Website unterliegen dem schweizerischen und internationalen Urheberrecht. Jede Verwendung ausserhalb der urheberrechtlichen Schranken bedarf der vorherigen schriftlichen Zustimmung der jeweiligen Rechteinhaber.</p>
      </section>

      <section class="legal-section" id="aenderungen">
        <h2>Änderungsvorbehalt</h2>
        <p>Wir behalten uns vor, dieses Impressum jederzeit anzupassen, wenn sich rechtliche Anforderungen, Ansprechpartner oder Angaben zu diesem Auftritt ändern.</p>
        <p>Letzte Aktualisierung: {{ legal.last_updated }}</p>
      </section>
    </div>
  </div>
</section>
