export default String.raw`
@course ap-music | AP Music Theory | AP | 🎹 | Arts

// Covers all 8 units of the AP Music Theory Course and Exam Description, grouped in pairs.

@unit Music Fundamentals I and II | Pitch, rhythm, scales, keys, intervals
@lesson Pitch, rhythm and meter
say: AP Music Theory starts with fundamentals. You'll need fluency in reading pitch and rhythm in every clef.
key: Know treble, bass, alto and tenor clefs. The alto clef (C clef) places middle C on the middle line; the tenor clef places middle C on the fourth line.
Meter: simple meters divide the beat into two (2/4, 3/4, 4/4); compound meters divide the beat into three (6/8, 9/8, 12/8). In 6/8, the beat is a dotted quarter note, with two beats per measure.
Rhythmic devices: syncopation (accents on weak beats), hemiola (a shift that makes duple feel in a triple meter), and anacrusis (a pickup note before the first full measure).
Musical terms: tempo (allegro, andante), dynamics (piano = soft, forte = loud, crescendo = getting louder) and articulation (staccato = short, legato = smooth).
term: compound meter = a meter in which each beat divides into three
term: syncopation = accenting weak beats or offbeats
term: anacrusis = a pickup note or notes before the first full measure
term: alto clef = a C clef with middle C on the middle line
q: In 6/8 time, how many beats per measure (in a typical tempo)? | *2 | 6 | 3 | 8
why: Two dotted-quarter beats.
q: Which clef places middle C on the middle line? | *Alto clef | Treble clef | Bass clef | Tenor clef
why: The alto clef centers middle C.
gen: bank.ARTS.music

@lesson Scales, keys and intervals
say: Scales, key signatures and intervals are the vocabulary of harmony. They must be automatic for the exam.
key: Know all major and minor key signatures and the circle of fifths. Minor forms: natural, harmonic (raised 7th) and melodic (raised 6th and 7th ascending).
Other scales: chromatic, whole-tone, pentatonic, and the modes (Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian).
Intervals have size and quality: perfect, major, minor, augmented, diminished. Inverting an interval: the numbers add to 9 and qualities swap (major ↔ minor, augmented ↔ diminished, perfect stays perfect). A major 3rd inverts to a minor 6th.
Compound intervals are larger than an octave (a 10th is an octave plus a 3rd).
term: mode = a scale pattern like Dorian or Mixolydian derived from the major scale
term: interval inversion = flipping an interval so the lower note becomes higher
term: compound interval = an interval larger than an octave
term: harmonic minor = a minor scale with a raised seventh degree
q: A perfect 4th inverts to a… | *perfect 5th | perfect 4th | major 5th | minor 5th
why: 4 + 5 = 9; perfect stays perfect.
q: The harmonic minor scale raises which degree? | *7th | 6th | 3rd | 2nd
why: It creates a leading tone.
gen: stem.interval

@unit Harmony and Voice Leading I and II | Triads and seventh chords, part writing, harmonic progression
@lesson Chords and Roman numerals
say: Chords and Roman numeral analysis are the heart of AP Music Theory.
key: In major keys: I, ii, iii, IV, V, vi, vii°. In minor keys (with raised leading tone): i, ii°, III, iv, V, VI, vii°.
Seventh chord qualities: major seventh (IM7), dominant seventh (V7), minor seventh (ii7), half-diminished (viiø7) and fully diminished (vii°7).
Inversions use figured bass: root position (5/3), first inversion (6 or 6/3), second inversion (6/4). For seventh chords: 7, 6/5, 4/3, 4/2.
ex: Analyze G–B–D–F in C major.
> Root G (degree 5), major triad with a minor 7th
= V7
term: Roman numeral analysis = labeling chords by scale degree and quality
term: figured bass = numbers indicating a chord's intervals above the bass note
term: half-diminished seventh = a diminished triad with a minor seventh
q: A first-inversion triad is labeled… | *6 | 6/4 | 7 | 4/2
why: The third is in the bass.
q: In a minor key, the V chord is major because… | *the leading tone is raised | it always is | the third is lowered | of the key signature
why: The raised 7th becomes the third of V.

@lesson Four-part voice leading
say: Part writing tests your ability to connect chords smoothly in four voices: soprano, alto, tenor and bass.
key: Voice-leading rules (SATB):
- Keep voices within their ranges, and keep spacing between upper voices within an octave.
- Avoid parallel perfect fifths and octaves between any two voices.
- Resolve the leading tone up to the tonic (especially in the soprano).
- Resolve the chordal seventh down by step.
- In root-position triads, usually double the root; never double the leading tone.
- Move voices by the smallest possible intervals (common tones stay).
ex: Two voices move from C–G to D–A. What's the problem?
> Both form perfect fifths moving in the same direction
= Parallel fifths, which are forbidden
term: voice leading = the smooth movement of individual voices between chords
term: parallel fifths = two voices moving in the same direction a perfect fifth apart
term: doubling = having two voices sing the same chord tone
term: SATB = soprano, alto, tenor and bass voices
q: Which should never be doubled? | *The leading tone | The root | The fifth | The bass
why: Doubling it creates parallel octaves when it resolves.
q: A chordal seventh should resolve… | *down by step | up by step | by leap | it shouldn't resolve
why: Sevenths are dissonances resolving downward.

@unit Harmony and Voice Leading III and IV | Cadences, nonchord tones, secondary dominants, modulation
@lesson Cadences and nonchord tones
say: Cadences shape phrases, and nonchord tones add melodic interest. Both appear constantly on the exam.
key: Cadences: perfect authentic (V–I, root position, tonic in soprano), imperfect authentic (V–I with other variations), half (ends on V), plagal (IV–I) and deceptive (V–vi).
The cadential 6/4 (I6/4 resolving to V) decorates the dominant at cadences.
Nonchord tones (notes not in the chord): passing tone (step-step, same direction), neighbor tone (step away and back), suspension (held over, then resolves down), appoggiatura (leap then step), escape tone (step then leap), anticipation, and pedal tone.
term: perfect authentic cadence = V to I with both chords in root position and the tonic in the soprano
term: suspension = a note held from the previous chord that resolves down by step
term: passing tone = a nonchord tone connecting two chord tones by step
term: cadential six-four = a tonic chord in second inversion that resolves to V at a cadence
q: A note that steps away from a chord tone and returns is a… | *neighbor tone | passing tone | suspension | appoggiatura
why: It neighbors the chord tone.
q: V–vi is a… | *deceptive cadence | half cadence | plagal cadence | perfect authentic cadence
why: It substitutes vi for I.

@lesson Secondary dominants and modulation
say: Secondary dominants borrow tension from other keys, and modulation moves the music to a new home.
key: A secondary dominant is the dominant of a chord other than I, written V/x. In C major, V/V is D major (D–F♯–A), which resolves to G (V). Secondary leading-tone chords are vii°/x.
Accidentals that don't belong to the key often signal secondary dominants.
Modulation changes the key. Common pivot-chord modulations move to closely related keys (those whose key signatures differ by one accidental, like C major to G major or A minor). A pivot chord functions in both keys.
ex: In C major, what chord is V/ii?
> ii is D minor; its dominant is A major
= A–C♯–E (A major)
term: secondary dominant = a dominant chord that tonicizes a chord other than I
term: tonicization = briefly treating a non-tonic chord as a temporary tonic
term: modulation = a change from one key to another
term: pivot chord = a chord common to both keys used in a modulation
q: In G major, V/V is… | *A major | D major | E minor | C major
why: V is D; its dominant is A.
q: Closely related keys differ by… | *at most one accidental in their key signatures | five accidentals | the same tonic only | tempo
why: They share most notes.

@unit Modes, Form and the Exam | Modes and other scales, musical form, aural skills and sight-singing
@lesson Modes and musical form
say: Modes and form expand your analysis beyond chords to the big picture of a piece.
key: Modes from the major scale: Ionian (major), Dorian (minor with raised 6th), Phrygian (minor with lowered 2nd), Lydian (major with raised 4th), Mixolydian (major with lowered 7th), Aeolian (natural minor), Locrian (diminished).
Phrase structure: a period has an antecedent phrase (ending with a weak cadence) and a consequent phrase (ending with a strong cadence). Parallel periods begin the same way; contrasting periods don't.
Forms: binary (rounded or simple), ternary, rondo, theme and variations, and sonata form.
Melodic devices: sequence (a pattern repeated at different pitch levels), inversion, augmentation and diminution.
term: Mixolydian mode = a major scale with a lowered seventh
term: period = two phrases where the second (consequent) answers the first (antecedent)
term: sequence = a melodic or harmonic pattern repeated at different pitch levels
term: rounded binary = a binary form where material from the start returns at the end of the second section
q: Which mode is major with a lowered seventh? | *Mixolydian | Lydian | Dorian | Phrygian
why: Mixolydian has ♭7.
q: An antecedent phrase usually ends with a… | *weaker cadence (often half) | perfect authentic cadence | no cadence | deceptive cadence only
why: The consequent answers with a stronger cadence.

@lesson Aural skills and exam strategies
say: Half of AP Music Theory is listening and singing. Train your ears every day.
key: The exam includes melodic and harmonic dictation (writing down what you hear), sight-singing, part writing from figured bass and Roman numerals, and multiple-choice listening and analysis.
Strategies:
- Dictation: find the key and meter first, write the rhythm, then the contour, then exact pitches. Use solfège (do, re, mi…) or scale-degree numbers.
- Harmonic dictation: write the bass line first, then identify Roman numerals; listen for cadences.
- Sight-singing: establish the key, sing the scale and tonic triad, keep a steady beat, and sing even if you make a mistake.
- Part writing: check for parallel fifths and octaves, voice ranges, doubling and resolution of tendency tones.
term: melodic dictation = writing down a melody heard aloud
term: harmonic dictation = writing the bass line and chords of a progression heard aloud
term: solfège = a system of syllables (do, re, mi) for singing scale degrees
term: sight-singing = singing music from notation without prior practice
q: In harmonic dictation, what should you usually write first? | *The bass line | The soprano melody | The alto | The tempo marking
why: The bass reveals chord roots and inversions.
q: During sight-singing, if you make a mistake, you should… | *keep going in rhythm | stop and restart | skip to the end | sing louder only
why: Continuity is scored.
`;
