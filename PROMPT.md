# GUIDE COMPLET - PROMPTS CURSOR + TÂCHES MANUELLES

## ORDRE D'EXÉCUTION

### PHASE 1: SETUP INITIAL (TOI - 15min)

### PHASE 2: LANDING PAGE (CURSOR - 1h30)

### PHASE 3: SEARCH PAGE (CURSOR - 2h)

### PHASE 4: STYLES & DATA (CURSOR + TOI - 2h)

### PHASE 5: LOGIQUE JS (CURSOR - 3h)

### PHASE 6: INTÉGRATIONS (TOI - 1h)

### PHASE 7: TESTING & POLISH (TOI - 1h)

---

## PHASE 1: SETUP INITIAL (TOI MANUELLEMENT)

### Tâche 1.1: Structure des dossiers

```bash
mkdir travel-booking
cd travel-booking
mkdir styles js assets
touch index.html search.html
touch styles/base.css styles/components.css styles/pages.css
touch js/data.js js/search.js js/booking.js js/utils.js
touch README.md
```

### Tâche 1.2: Favicon

- Télécharge un favicon d'avion depuis flaticon.com
- Place dans `/assets/favicon.ico`
- Ajoute dans le `<head>` de chaque HTML:

```html
<link rel="icon" type="image/x-icon" href="/assets/favicon.ico" />
```

### Tâche 1.3: Configuration VS Code / Cursor

- Installe extension "Live Server"
- Configure auto-save
- Prêt à générer le code

---

## PHASE 2: LANDING PAGE (CURSOR)

### PROMPT 2.1: Structure HTML Landing Page

```
Crée le fichier index.html pour une landing page de plateforme de réservation de vols.

STRUCTURE:
- <!DOCTYPE html> avec lang="fr"
- <head> avec meta charset, viewport, title "SkyMove - Your Journey Starts Here"
- Lien vers Tailwind CSS CDN: <script src="https://cdn.tailwindcss.com"></script>
- Lien vers styles/base.css et styles/pages.css

BODY:
1. Header sticky avec:
   - Logo "SkyMove" (texte stylé)
   - Rien d'autre (minimaliste)

2. Main section hero (full viewport height):
   - Background: gradient dégradé violet/bleu moderne
   - Container centré avec:
     - H1: "Your Journey Starts Here"
     - Sous-titre: "Book flights and airport transfers in one seamless experience"
     - Paragraphe small: "✈️ 500+ Airlines • 🚗 Airport Transfers • 🔒 Secure Booking"
     - Bouton CTA rouge grand: "Start Booking Now →" (lien vers search.html)
     - Petit texte sous bouton: "No fees • Instant confirmation • 24/7 support"

3. Section stats (glassmorphism card):
   - Grid 3 colonnes: "2M+ Travelers", "500+ Destinations", "4.8★ Rating"
   - Background transparent avec backdrop-blur

4. Footer simple:
   - Texte copyright centré
   - Liens: Help, Contact, Terms
   - Paiement icons (💳🏦💰)

DESIGN:
- Classes Tailwind uniquement
- Responsive mobile-first
- Texte blanc sur fond gradient
- Bouton rouge (#ef4444) avec hover effect
- Espacement généreux

Ne génère PAS le CSS custom, juste le HTML avec classes Tailwind.
```

### PROMPT 2.2: Animations Landing Page

```
Ajoute dans index.html, juste avant </body>, un <script> inline pour:

1. Fade-in animation au chargement:
   - Sélectionne l'élément main
   - Au DOMContentLoaded, applique transition opacity 0 → 1 sur 800ms
   - Translate Y de 20px → 0

2. Bouton CTA hover avec scale:
   - Au hover, scale(1.05) avec transition smooth

3. Chat bubble (optionnel si temps):
   - Fixed bottom-right
   - Icône 💬
   - Au clic: alert avec message aide

Code vanilla JS, pas de librairie. Commentaires en français.
```

---

## PHASE 3: SEARCH PAGE (CURSOR)

### PROMPT 3.1: Structure HTML Search Page

```
Crée le fichier search.html pour la page de recherche et résultats de vols.

STRUCTURE HEAD:
- Même setup que index.html (meta, Tailwind CDN)
- Liens vers base.css, components.css, pages.css

BODY:
1. Header sticky (même que landing mais avec breadcrumb):
   - Logo "SkyMove" cliquable vers index.html
   - Badges: "🔒 Secure", "⭐ 4.8", "✈️ 2M+"

2. Section formulaire recherche (padding généreux, background gris clair):
   - Container glassmorphism avec:
     - H1: "Find Your Perfect Flight"
     - Form avec ID "search-form":

       a) Radio buttons trip type:
          - Round-trip (checked par défaut)
          - One-way

       b) Grid 5 colonnes (responsive: 1 col mobile, 5 desktop):
          - Input "From" (id: from-input, placeholder: "Paris")
            + Div dropdown vide (id: from-dropdown, class: hidden)
          - Input "To" (id: to-input, placeholder: "London")
            + Div dropdown vide (id: to-dropdown, class: hidden)
          - Input date "Departure" (id: departure-date, type: date)
          - Input date "Return" (id: return-date, type: date)
          - Select "Passengers" (options: 1-4 adults)

       c) Bouton submit centré:
          - ID: search-btn
          - Texte: "Search Flights"
          - Span pour loader (hidden par défaut)

3. Section résultats (max-width container):
   - H2: "Available Flights"
   - Div dropdown "Sort by" (Price, Duration, Departure)
   - Div vide ID "results-grid" (grid gap, sera rempli par JS)

4. Modal booking (overlay hidden par défaut):
   - ID: booking-modal
   - Structure:
     - Backdrop dark avec blur
     - Container blanc centré (max-width 600px)
     - Bouton close (×)
     - H2: "Confirm Your Booking"
     - Div ID "flight-summary" (sera rempli par JS)
     - Form ID "booking-form":
       - Input name (required)
       - Input email (required)
       - Input phone
     - Section taxi addon:
       - Checkbox ID "taxi-toggle"
       - Label "Add Airport Transfer"
       - Prix affiché
     - Div total price (ID: total-price)
     - Bouton "Confirm & Pay"

5. Footer (copie du landing, simplifié)

DESIGN:
- Toutes classes Tailwind
- Inputs avec focus:ring-red-500
- Responsive grid adaptatif
- Modal avec backdrop-blur et animation

Pas de CSS custom, juste HTML structure propre.
```

### PROMPT 3.2: Flight Cards Template

````
Dans search.html, ajoute juste après le H2 "Available Flights" et avant le div vide "results-grid",
un template HTML commenté pour une card de vol. Ce template servira de référence pour le JS.

STRUCTURE CARD (dans un commentaire HTML):
```html
<!-- TEMPLATE FLIGHT CARD (to be cloned by JS)
<div class="flight-card bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
  <div class="flex justify-between items-center">
    <div class="flex items-center space-x-6">
      <!-- Airline logo circle -->
      <div class="text-center">
        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
          <span class="text-blue-600 font-bold text-sm">[CODE]</span>
        </div>
        <div class="text-xs text-gray-500">[Airline]</div>
      </div>

      <!-- Flight times -->
      <div class="flex items-center space-x-8">
        <div class="text-center">
          <div class="text-xl font-bold">[08:30]</div>
          <div class="text-sm text-gray-500">[CDG]</div>
        </div>
        <div class="flex flex-col items-center">
          <div class="text-sm text-gray-500">[2h 15m]</div>
          <div class="w-20 h-px bg-gray-300 my-1"></div>
          <div class="text-xs text-green-600">[Direct]</div>
        </div>
        <div class="text-center">
          <div class="text-xl font-bold">[10:45]</div>
          <div class="text-sm text-gray-500">[LHR]</div>
        </div>
      </div>
    </div>

    <!-- Price & Select button -->
    <div class="text-right">
      <div class="text-sm text-gray-500 mb-1">from</div>
      <div class="text-2xl font-bold text-gray-800 mb-2">[€89]</div>
      <button class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors btn-select-flight" data-flight-id="[ID]">
        Select
      </button>
    </div>
  </div>
</div>
-->
````

Formate bien le commentaire, il servira de template exact pour le clonage JS.

```

---

## PHASE 4: STYLES & DATA (CURSOR + TOI)

### PROMPT 4.1: Base CSS
```

Crée styles/base.css avec:

1. CSS Reset basique:

   - - { margin: 0; padding: 0; box-sizing: border-box; }
   - html, body { height: 100%; }

2. Variables CSS:

```css
:root {
  --primary: #ef4444;
  --primary-dark: #dc2626;
  --secondary: #667eea;
  --gray-50: #f8fafc;
  --gray-100: #f1f5f9;
  --gray-800: #1e293b;
  --success: #10b981;
  --warning: #f59e0b;
}
```

3. Typography de base:

   - body { font-family: 'Inter', sans-serif; font-size: 16px; line-height: 1.6; color: #1e293b; }
   - h1, h2, h3 avec font-weights appropriés

4. Utility classes:

   - .hidden { display: none; }
   - .spinner (animation rotate pour loading)

5. Smooth scroll:
   - html { scroll-behavior: smooth; }

Commentaires en français pour chaque section.

```

### PROMPT 4.2: Components CSS
```

Crée styles/components.css avec:

1. Glassmorphism effect:

```css
.glass-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
}
```

2. Button styles:

   - .btn-primary (gradient rouge, hover lift)
   - .btn-secondary (outline gris)
   - .btn disabled state

3. Form elements:

   - input, select focus states
   - Autocomplete dropdown styles
   - Form validation (error, success borders)

4. Modal:

   - .modal-overlay (fixed, backdrop-blur)
   - .modal-content (animation slide-in)
   - Responsive modal

5. Flight card hover effect:

   - .flight-card:hover { transform: translateY(-4px); }

6. Loading spinner:
   - @keyframes spin pour rotation
   - .spinner class

Tout doit être responsive. Commentaires pour chaque composant.

```

### PROMPT 4.3: Mock Data
```

Crée js/data.js avec export de trois constantes:

1. AIRPORTS (array de 10-12 aéroports):

```javascript
export const AIRPORTS = [
  { code: "CDG", city: "Paris", name: "Charles de Gaulle", country: "France" },
  { code: "ORY", city: "Paris", name: "Orly", country: "France" },
  { code: "LHR", city: "London", name: "Heathrow", country: "UK" },
  { code: "LGW", city: "London", name: "Gatwick", country: "UK" },
  { code: "JFK", city: "New York", name: "JFK", country: "USA" },
  { code: "FCO", city: "Rome", name: "Fiumicino", country: "Italy" },
  { code: "MAD", city: "Madrid", name: "Barajas", country: "Spain" },
  { code: "BCN", city: "Barcelona", name: "El Prat", country: "Spain" },
  { code: "FRA", city: "Frankfurt", name: "Airport", country: "Germany" },
  { code: "AMS", city: "Amsterdam", name: "Schiphol", country: "Netherlands" },
];
```

2. FLIGHTS (array de 25-30 vols variés):

```javascript
export const FLIGHTS = [
  {
    id: "AF001",
    airline: "Air France",
    airlineCode: "AF",
    from: "CDG",
    to: "LHR",
    departure: "08:30",
    arrival: "09:45",
    duration: "1h 15m",
    stops: 0,
    price: 89,
    currency: "€",
  },
  // ... générer 24 autres vols avec:
  // - Différentes compagnies (BA, LH, AF, IB, KL, EZY)
  // - Routes variées entre les aéroports ci-dessus
  // - Prix réalistes (50-500€)
  // - Durées cohérentes
  // - Mix de direct et escales (0, 1, ou 2)
];
```

3. TRANSFERS (objet avec prix taxi par aéroport):

```javascript
export const TRANSFERS = {
  CDG: [
    { type: "Economy", price: 25, vehicle: "Sedan", duration: "45min" },
    { type: "Business", price: 45, vehicle: "Mercedes", duration: "40min" },
    { type: "Van", price: 65, vehicle: "8-seater", duration: "45min" },
  ],
  LHR: [
    { type: "Economy", price: 35, vehicle: "Sedan", duration: "60min" },
    { type: "Business", price: 55, vehicle: "Mercedes", duration: "55min" },
    { type: "Van", price: 75, vehicle: "8-seater", duration: "60min" },
  ],
  // ... même structure pour les autres aéroports (prix légèrement différents)
};
```

Données réalistes et variées. Commentaires pour expliquer la structure.

```

---

## PHASE 5: LOGIQUE JS (CURSOR)

### PROMPT 5.1: Search Logic & Autocomplete
```

Crée js/search.js qui gère la recherche et l'autocomplete.

IMPORTS:

```javascript
import { AIRPORTS, FLIGHTS } from "./data.js";
```

FONCTIONS À CRÉER:

1. setupAutocomplete(inputId, dropdownId):

   - Écoute input sur le champ
   - Filtre AIRPORTS selon la saisie (city ou code)
   - Affiche max 5 suggestions dans dropdown
   - Au clic sur suggestion: remplit input et cache dropdown
   - Focus/blur pour show/hide dropdown

2. setupSearchForm():

   - Écoute submit du form
   - Récupère valeurs from, to, dates, passengers
   - Validation basique (champs requis)
   - Appelle searchFlights() avec critères
   - Affiche loader pendant 2 secondes
   - Affiche résultats

3. searchFlights(criteria):

   - Filtre FLIGHTS selon from et to
   - Retourne array de vols correspondants

4. displayResults(flights):

   - Vide le div results-grid
   - Pour chaque vol:
     - Clone le template de card
     - Remplit les données (horaires, prix, etc.)
     - Ajoute event listener sur bouton "Select"
     - Append au grid
   - Si 0 résultats: affiche message "No flights found"

5. sortFlights(flights, sortBy):

   - Sort by "price", "duration", ou "departure"
   - Retourne flights triés

6. Init au chargement:
   - DOMContentLoaded
   - Setup autocomplete pour from et to
   - Setup form submit
   - Setup dropdown sort
   - Set default dates (demain et +7 jours)
   - Set min date = aujourd'hui

Code propre, commenté en français, gestion erreurs basique.
Export setupSearchForm pour être appelé depuis main.

```

### PROMPT 5.2: Booking Modal Logic
```

Crée js/booking.js qui gère le modal de réservation.

IMPORTS:

```javascript
import { FLIGHTS, TRANSFERS } from "./data.js";
```

VARIABLES GLOBALES:

- selectedFlight (null)
- selectedTransfer (null)
- totalPrice (0)

FONCTIONS À CRÉER:

1. openBookingModal(flightId):

   - Récupère flight depuis FLIGHTS par id
   - Store dans selectedFlight
   - Remplit le flight-summary HTML avec infos vol
   - Récupère transfers pour cet aéroport destination
   - Affiche options taxi si disponibles
   - Reset form
   - Affiche modal (remove class hidden)
   - Ajoute animation slide-in

2. closeBookingModal():

   - Cache modal (add class hidden)
   - Reset toutes les variables
   - Clear form

3. setupTaxiToggle():

   - Écoute change sur checkbox taxi-toggle
   - Si checked:
     - Affiche section choix taxi
     - Sélectionne Economy par défaut
   - Si unchecked:
     - selectedTransfer = null
   - Appelle updateTotalPrice()

4. updateTotalPrice():

   - totalPrice = selectedFlight.price
   - Si selectedTransfer: totalPrice += selectedTransfer.price
   - Met à jour le DOM (element #total-price)
   - Format: "€XXX"

5. validateBookingForm():

   - Vérifie name, email non vides
   - Vérifie format email basique (regex)
   - Retourne true/false
   - Affiche erreurs visuelles sur inputs invalides

6. simulatePayment():

   - Validation form d'abord
   - Si invalide: return
   - Disable bouton "Confirm & Pay"
   - Change texte en "Processing..."
   - Affiche spinner
   - setTimeout 2500ms:
     - Génère confirmation code (random 8 chars)
     - Appelle showConfirmation()

7. showConfirmation(confirmationCode):

   - Cache form booking
   - Affiche div confirmation:
     - Checkmark animé ✅
     - "Booking Confirmed!"
     - Confirmation code
     - Récap flight + taxi si ajouté
     - Prix total payé
     - "Confirmation email sent to [email]"
   - Bouton "Book Another Flight" → recharge page

8. Init au chargement:
   - Setup event listeners:
     - Bouton close modal
     - Click backdrop (ferme modal)
     - Checkbox taxi toggle
     - Form submit (simulatePayment)
   - Export openBookingModal pour être appelé depuis search.js

Code vanilla JS, async/await si besoin, commentaires français.

```

### PROMPT 5.3: Utils & Helpers
```

Crée js/utils.js avec fonctions helper exportées:

1. formatDate(date):

   - Prend Date object ou string
   - Retourne format "DD/MM/YYYY"

2. formatTime(timeString):

   - Prend "08:30"
   - Retourne formaté ou converti si besoin

3. formatPrice(amount, currency = "€"):

   - Retourne "€89" formaté

4. calculateDuration(departure, arrival):

   - Calcule différence entre deux horaires
   - Retourne string "Xh XXm"

5. generateConfirmationCode():

   - Génère code aléatoire alphanumérique
   - Format: "SK" + 8 caractères uppercase
   - Exemple: "SKAB12CD34"

6. validateEmail(email):

   - Regex basique email validation
   - Retourne true/false

7. setMinDate(inputId):

   - Set l'attribut min d'un input date à aujourd'hui
   - Empêche sélection dates passées

8. showToast(message, type = 'info'):
   - Affiche notification temporaire (toast)
   - Types: 'success', 'error', 'info'
   - Auto-hide après 3 secondes
   - Position: top-right fixed

Fonctions simples, réutilisables, bien commentées.
Export default objet avec toutes les fonctions.

````

---

## PHASE 6: INTÉGRATIONS MANUELLES (TOI)

### Tâche 6.1: EmailJS Setup (OPTIONNEL si temps)

**SI tu veux vraiment des emails:**

1. Va sur emailjs.com
2. Crée compte gratuit
3. Setup service (Gmail)
4. Crée template email avec variables:
   - {{user_name}}
   - {{user_email}}
   - {{confirmation_code}}
   - {{flight_info}}
   - {{total_price}}

5. Dans booking.js, ajoute:
```javascript
// Après ligne 1
import emailjs from '@emailjs/browser'; // Via CDN

// Dans showConfirmation(), ajoute:
async function sendConfirmationEmail(data) {
    try {
        await emailjs.send(
            'YOUR_SERVICE_ID',
            'YOUR_TEMPLATE_ID',
            {
                user_name: data.name,
                user_email: data.email,
                confirmation_code: data.code,
                flight_info: data.flight,
                total_price: data.price
            },
            'YOUR_PUBLIC_KEY'
        );
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Email failed:', error);
        // Pas grave si ça fail, juste log
    }
}
````

**IMPORTANT:** Ne perds pas de temps là-dessus si c'est compliqué. Pour la démo, juste afficher "Email sent to [email]" suffit amplement.

### Tâche 6.2: Google Fonts (OPTIONNEL)

Si Tailwind system fonts ne suffisent pas:

Dans `<head>` de index.html et search.html:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

Dans base.css:

```css
body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
}
```

### Tâche 6.3: Main Entry Point

Crée `js/main.js`:

```javascript
import { setupSearchForm } from "./search.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("App initialized");

  // Si on est sur search.html
  if (document.getElementById("search-form")) {
    setupSearchForm();
  }
});
```

Ajoute dans search.html avant `</body>`:

```html
<script type="module" src="js/main.js"></script>
```

### Tâche 6.4: Connection des modules

Dans search.js, quand on clique "Select" sur une flight card:

```javascript
// Import booking au début
import { openBookingModal } from "./booking.js";

// Dans displayResults(), pour chaque bouton Select:
selectBtn.addEventListener("click", () => {
  openBookingModal(flight.id);
});
```

---

## PHASE 7: TESTING & POLISH (TOI)

### Checklist Testing

**Desktop (Chrome):**

- [ ] Landing page charge
- [ ] Clic CTA va sur search.html
- [ ] Autocomplete affiche suggestions
- [ ] Submit form affiche loader puis résultats
- [ ] Clic "Select" ouvre modal
- [ ] Checkbox taxi met à jour prix
- [ ] Confirm & Pay affiche confirmation
- [ ] Pas d'erreurs console

**Mobile (DevTools):**

- [ ] Layout responsive parfait
- [ ] Formulaire utilisable au pouce
- [ ] Cards lisibles
- [ ] Modal s'affiche bien
- [ ] Boutons suffisamment grands (min 44px)

**Bugs Fréquents:**

- Modules JS pas chargés → vérifier `type="module"` dans script tags
- Autocomplete pas affiché → vérifier z-index et position
- Prix pas mis à jour → vérifier event listeners
- Modal pas centré → vérifier CSS flexbox

### Polish Final

**Animations à vérifier:**

- Transitions smooth sur hover (buttons, cards)
- Modal slide-in propre
- Loading spinner tourne bien
- Fade-in landing page

**Contenu:**

- Pas de "Lorem ipsum"
- Prix cohérents et réalistes
- Horaires crédibles
- Textes sans fautes

**Performance:**

- Page charge en < 2s
- Pas de lag sur interactions
- Images optimisées (si tu en ajoutes)

---

## RÉCAP: CE QUE TOI TU FAIS VS CURSOR

### TOI (tâches manuelles):

1. Créer structure dossiers
2. Setup Live Server
3. Ajouter favicon
4. Configurer EmailJS (optionnel)
5. Tester sur mobile et desktop
6. Fix bugs CSS/JS
7. Polish final animations
8. Préparer PPT
9. Répéter démo

### CURSOR (génération code):

1. Toute la structure HTML (landing + search)
2. Tout le CSS (base, components, pages)
3. Toutes les données mock (data.js)
4. Toute la logique JS (search, booking, utils)
5. Animations et transitions
6. Responsive design

**Ratio: 80% Cursor, 20% Toi**

---

## ORDRE D'EXÉCUTION OPTIMAL

**Jour 1 (Aujourd'hui):**

1. TOI: Setup structure (15min)
2. CURSOR: Landing HTML (PROMPT 2.1) → tester
3. CURSOR: Landing animations (PROMPT 2.2) → tester
4. CURSOR: Search HTML (PROMPT 3.1 + 3.2) → tester structure
5. CURSOR: Base CSS (PROMPT 4.1) → appliquer et voir résultat
6. CURSOR: Components CSS (PROMPT 4.2) → vérifier styles
7. TOI: Ajustements CSS si besoin (30min)

**Jour 2 (Demain):**

1. CURSOR: Mock data (PROMPT 4.3) → vérifier données
2. CURSOR: Search logic (PROMPT 5.1) → tester autocomplete
3. CURSOR: Booking logic (PROMPT 5.2) → tester modal
4. CURSOR: Utils (PROMPT 5.3)
5. TOI: Connection modules (6.3, 6.4) (30min)
6. TOI: Testing complet (1h)
7. TOI: Polish animations (30min)

**Samedi matin:**

1. TOI: Derniers fixes bugs (30min)
2. TOI: PPT (1h)
3. TOI: Répétition démo (30min)

---

## CONSEILS CURSOR AI

**Comment utiliser les prompts:**

1. Copie-colle le prompt EXACT dans Cursor
2. Si génère trop/pas assez: précise "Only HTML structure" ou "Add more details"
3. Si bug: "Fix this error: [copie erreur console]"
4. Si pas responsive: "Make this mobile-responsive with Tailwind breakpoints"

**Prompts de correction:**

- "This element is not centered on mobile, fix it"
- "Add hover effect to this button"
- "The modal doesn't close, fix the event listener"
- "Autocomplete dropdown is behind other elements, fix z-index"

**Prompts d'amélioration:**

- "Add loading skeleton for flight cards"
- "Improve this animation to be smoother"
- "Add error state for form validation"

---

## SI TU BLOQUES

**Problème:** Autocomplete ne s'affiche pas
**Solution:** Vérifie z-index, position absolute, parent avec position relative

**Problème:** Modal ne se centre pas
**Solution:** Fixed position, top/left 50%, transform translate(-50%, -50%)

**Problème:** JS ne charge pas
**Solution:** Vérifie `type="module"` dans script tag, chemins imports corrects

**Problème:** Dates ne se valident pas
**Solution:** Vérifie format date (YYYY-MM-DD pour input type="date")

**Problème:** Prix ne se met pas à jour
**Solution:** Console.log les valeurs, vérifie event listeners sur checkbox

---

## PRIORITÉS SI MANQUE DE TEMPS

**MUST HAVE (Critique):**

- Landing page fonctionnelle
- Search page avec résultats affichés
- Modal booking avec simulation paiement
- Responsive mobile

**NICE TO HAVE (Bonus):**

- EmailJS confirmation
- Animations avancées
- Filtres prix/compagnies
- Page confirmation séparée
- Chat bubble

**SKIP SI DEADLINE PROCHE:**

- EmailJS (juste simuler)
- Filtres avancés (tri suffit)
- Optimisations perf poussées
- Tests unitaires

---

## DERNIERS CONSEILS

1. **Commence MAINTENANT** - pas de procrastination
2. **Teste après chaque prompt** - fix bugs au fur et à mesure
3. **Commit souvent** (si tu utilises Git)
4. **Focus sur le visuel** d'abord - ça impressionne
5. **Prépare PPT en parallèle** - screenshots au fur et à mesure
6. **Pas de perfectionnisme** - mieux fait que parfait
7. **Dors bien** avant la présentation

Tu as tout ce qu'il faut. Exécute maintenant.
