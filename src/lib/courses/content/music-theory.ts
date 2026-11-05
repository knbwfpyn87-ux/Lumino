export default String.raw`
@course music-theory | Music Theory | Standard | 🎼 | Arts

@unit Notation and Rhythm | Pitch and the staff, rhythm and meter
@lesson Pitch and the staff
say: Music theory explains how music works. It starts with reading notes on the staff.
Music is written on a staff of five lines and four spaces. Clefs set the pitches: the treble clef (G clef) for higher notes and the bass clef (F clef) for lower notes.
key: Treble clef lines (bottom to top): E G B D F ("Every Good Boy Does Fine"); spaces: F A C E. Bass clef lines: G B D F A ("Good Boys Do Fine Always"); spaces: A C E G ("All Cows Eat Grass").
The musical alphabet uses A through G, then repeats. Ledger lines extend the staff. Middle C sits between the two staves.
Accidentals change pitch: a sharp (♯) raises a note by a half step, a flat (♭) lowers it by a half step, and a natural (♮) cancels them.
term: staff = the five lines and four spaces where music is written
term: treble clef = a clef for higher pitches, also called the G clef
term: sharp = a symbol that raises a note by a half step
term: ledger line = a short line extending the staff above or below
q: What are the treble clef spaces, bottom to top? | *F A C E | E G B D | A C E G | G B D F
why: They spell FACE.
q: A flat… | *lowers a note by a half step | raises a note by a half step | doubles its length | silences it
why: Flats lower pitch.
gen: bank.ARTS.music

@lesson Rhythm and meter
say: Rhythm is the timing of music. Let's learn how notes and beats are measured.
key: Note values: whole note (4 beats in 4/4), half note (2), quarter note (1), eighth note (½), sixteenth note (¼). Each has a matching rest. A dot adds half the note's value: a dotted half note = 3 beats.
The time signature tells how many beats are in each measure (top number) and which note gets one beat (bottom number). 4/4 (common time) has four quarter-note beats; 3/4 has three (waltz).
Simple meters divide beats into two (2/4, 3/4, 4/4); compound meters divide beats into three (6/8, 9/8, 12/8).
Tempo is the speed of the beat, often marked in Italian: largo (slow), andante (walking pace), allegro (fast).
ex: In 4/4 time, how many eighth notes fill one measure?
> 4 beats; each eighth note is ½ beat
= 8 eighth notes
term: time signature = the symbol showing beats per measure and which note gets the beat
term: measure = a segment of music containing a set number of beats
term: dotted note = a note lengthened by half its value
term: tempo = the speed of the music
q: How many beats does a dotted half note get in 4/4? | *3 | 2 | 4 | 1.5
why: 2 + 1 = 3.
q: Which time signature is compound? | *6/8 | 4/4 | 3/4 | 2/4
why: Beats divide into three.

@unit Scales and Keys | Major and minor scales, key signatures
@lesson Major scales
say: Scales are the building blocks of melodies and harmonies. The major scale sounds bright and happy.
key: The major scale follows the pattern of whole (W) and half (H) steps: W W H W W W H. A half step is the smallest distance (adjacent keys on a piano); a whole step is two half steps.
C major has no sharps or flats: C D E F G A B C. Other major scales need sharps or flats to keep the pattern.
Scale degrees have names: 1 tonic, 2 supertonic, 3 mediant, 4 subdominant, 5 dominant, 6 submediant, 7 leading tone.
ex: Build G major.
> Start on G: G A B C D E F♯ G
> F needs a sharp to keep the W-H pattern
= G major has one sharp: F♯
term: major scale = a scale with the pattern W W H W W W H
term: half step = the smallest interval in Western music
term: tonic = the first note of a scale, its home pitch
term: leading tone = the seventh scale degree, which pulls toward the tonic
q: What is the step pattern of a major scale? | *W W H W W W H | W H W W H W W | H W W W H W W | W W W H W W H
why: That's the major scale formula.
q: The fifth scale degree is called the… | *dominant | tonic | mediant | leading tone
why: Dominant is degree 5.
gen: stem.semitones

@lesson Minor scales and key signatures
say: Minor scales sound darker. Every major key has a relative minor that shares its key signature.
key: The natural minor scale pattern: W H W W H W W. A minor has no sharps or flats (A B C D E F G A).
Harmonic minor raises the 7th degree; melodic minor raises the 6th and 7th going up.
Relative keys share a key signature: the relative minor starts on the 6th degree of the major scale (C major and A minor). Parallel keys share a tonic (C major and C minor).
The circle of fifths organizes keys: moving clockwise adds a sharp (C, G, D, A…); counterclockwise adds a flat (C, F, B♭, E♭…). Order of sharps: F C G D A E B. Order of flats: B E A D G C F.
term: relative minor = the minor key sharing a key signature with a major key
term: parallel minor = the minor key with the same tonic as a major key
term: circle of fifths = a diagram showing the relationships among keys
term: key signature = sharps or flats at the start of a staff indicating the key
q: What is the relative minor of C major? | *A minor | C minor | E minor | G minor
why: It starts on the 6th degree, A.
q: Which key has two sharps? | *D major | G major | F major | A major
why: D major has F♯ and C♯.

@unit Intervals and Chords | Intervals, triads and seventh chords
@lesson Intervals
say: An interval is the distance between two notes. Intervals create the colors of melody and harmony.
key: Intervals have a number (count the letter names, including both) and a quality: perfect (unisons, 4ths, 5ths, octaves), major or minor (2nds, 3rds, 6ths, 7ths), augmented or diminished.
Semitone counts: minor 2nd = 1, major 2nd = 2, minor 3rd = 3, major 3rd = 4, perfect 4th = 5, tritone = 6, perfect 5th = 7, minor 6th = 8, major 6th = 9, minor 7th = 10, major 7th = 11, octave = 12.
Consonant intervals sound stable (3rds, 5ths, 6ths, octaves); dissonant intervals sound tense (2nds, 7ths, the tritone).
ex: What interval is C up to E?
> Count C-D-E: a 3rd; 4 half steps
= A major 3rd
term: interval = the distance between two pitches
term: perfect fifth = an interval of seven half steps
term: tritone = an interval of six half steps, highly dissonant
term: consonance = a stable, pleasant-sounding combination of notes
q: How many half steps are in a perfect fifth? | *7 | 5 | 6 | 8
why: C to G is seven half steps.
q: C up to A is a… | *major 6th | minor 6th | perfect 5th | major 7th
why: Six letter names, 9 half steps.
gen: stem.interval, stem.semitones

@lesson Triads and seventh chords
say: Chords are three or more notes played together. Triads are the most basic chords.
key: A triad stacks two 3rds: root, third and fifth.
- Major triad: major 3rd + minor 3rd (C E G), sounds bright.
- Minor triad: minor 3rd + major 3rd (A C E), sounds dark.
- Diminished: two minor 3rds (B D F), tense.
- Augmented: two major 3rds (C E G♯), unstable.
Roman numerals label chords by scale degree: in a major key, I, IV and V are major; ii, iii and vi are minor; vii° is diminished.
Seventh chords add a 7th above the root. The dominant seventh (V7) is very common and strongly pulls to the tonic.
Inversions put a note other than the root in the bass: first inversion (third in bass), second inversion (fifth in bass).
term: triad = a three-note chord built from stacked thirds
term: root = the note a chord is built on and named after
term: dominant seventh = a major triad with a minor seventh, built on the fifth degree
term: inversion = a chord with a note other than the root in the bass
q: What quality is the triad C–E♭–G? | *Minor | Major | Diminished | Augmented
why: A minor 3rd then a major 3rd.
q: In C major, which chord is V? | *G major | F major | D minor | B diminished
why: G is the fifth degree.

@unit Harmony and Form | Chord progressions and cadences, musical form
@lesson Chord progressions and cadences
say: Chord progressions give music direction. Cadences are the punctuation marks that end phrases.
key: Harmonic function: tonic (I, home), predominant (IV, ii, leading away), and dominant (V, V7, creating tension that wants to resolve to I).
Common progressions: I–IV–V–I, I–V–vi–IV (heard in countless pop songs), ii–V–I (jazz).
Cadences:
- Authentic cadence (V–I): strong and final, like a period.
- Half cadence (ends on V): unfinished, like a comma.
- Plagal cadence (IV–I): the "amen" cadence.
- Deceptive cadence (V–vi): a surprise.
ex: A phrase ends on a V chord. What cadence is it?
> It stops on the dominant, unresolved
= A half cadence
term: cadence = a chord progression that ends a musical phrase
term: authentic cadence = a V to I cadence, the strongest ending
term: half cadence = a phrase ending on the V chord
term: harmonic function = the role of a chord as tonic, predominant or dominant
q: Which cadence sounds most final? | *Authentic (V–I) | Half | Deceptive | Plagal only
why: V to I resolves tension.
q: V to vi is a… | *deceptive cadence | plagal cadence | half cadence | authentic cadence
why: It avoids the expected I.

@lesson Musical form
say: Form is the structure of a piece of music, like the outline of an essay.
key: Phrases are musical sentences, often 4 or 8 measures long. Two phrases can form a period (antecedent and consequent).
Common forms:
- Binary (AB): two contrasting sections.
- Ternary (ABA): statement, contrast, return.
- Rondo (ABACA): a recurring theme alternating with contrasting sections.
- Theme and variations: a melody altered in each repetition.
- Sonata form: exposition, development and recapitulation.
- Verse–chorus form: common in popular music.
Motives are short musical ideas that are repeated and developed, like the four-note opening of Beethoven's Fifth Symphony.
term: binary form = a two-part form, AB
term: ternary form = a three-part form, ABA
term: rondo = a form with a recurring theme, ABACA
term: motive = a short, recognizable musical idea
q: ABA is called… | *ternary form | binary form | rondo | sonata form
why: Three parts with a return.
q: Which form features a recurring theme alternating with new sections? | *Rondo | Binary | Through-composed | Strophic
why: ABACA.
`;
