import React from "react";
import { View, Text, ScrollView, StyleSheet, Button, TouchableOpacity } from "react-native";
import * as Speech from "expo-speech";
import BottomNavBar from "./BottomNavBar";

const cuentos = [
  {
    titulo: "El león y el ratón",
    es: "Un león atrapó a un pequeño ratón. El ratón le pidió que lo dejara libre y prometió ayudarlo algún día. El león se rió, pero lo dejó ir. Más tarde, el león quedó atrapado en una red. El ratón lo escuchó y, con sus dientes, rompió la red y lo liberó. Moraleja: Hasta el más pequeño puede ayudar al más grande.",
    ar: "أمسك الأسد بفأر صغير. طلب الفأر من الأسد أن يتركه ووعده أن يساعده يومًا ما. ضحك الأسد، لكنه أطلق سراحه. لاحقًا، وقع الأسد في شبكة. سمعه الفأر وبأسنانه قطع الشبكة وأنقذه. العبرة: حتى الأصغر يمكن أن يساعد الأكبر.",
    // imagen eliminada: require('../assets/cuentos/leon_raton.png')
  },
  {
    titulo: "La zorra y las uvas",
    es: "Una zorra hambrienta vio unas uvas colgando de una parra. Intentó alcanzarlas muchas veces, pero no pudo. Al final, se fue diciendo: “¡Están verdes, no me gustan!”. Moraleja: Es fácil despreciar lo que no se puede conseguir.",
    ar: 'رأت ثعلبة جائعة عنقود عنب يتدلى من الكرمة. حاولت مرارًا أن تصل إليه، لكنها لم تستطع. في النهاية ابتعدت قائلة: "العنب حامض ولا يعجبني". العبرة: من السهل أن نحتقر ما لا نستطيع الحصول عليه.',
  },
  {
    titulo: "El pastor mentiroso",
    es: "Un joven pastor aburrido gritó varias veces “¡Que viene el lobo!” para divertirse, y los vecinos acudieron a ayudarlo. Cuando de verdad vino el lobo, nadie le creyó y las ovejas se perdieron. Moraleja: Nadie cree a un mentiroso, aunque diga la verdad.",
    ar: 'كان هناك راعٍ شاب شعر بالملل، فصار يصرخ مرارًا: "الذئب! الذئب!" ليمرح فقط، فجاء القرويون لمساعدته. وعندما جاء الذئب فعلاً، لم يصدقه أحد، فضاعت الخراف. العبرة: لا يصدق الناس الكذاب حتى لو قال الحقيقة.',
  },
  {
    titulo: "El hombre y el árbol",
    es: "Un hombre cansado se sentó bajo un árbol y se quedó dormido. Al despertar, agradeció al árbol por la sombra y los frutos. Moraleja: Agradece siempre a quienes te ayudan.",
    ar: "جلس رجل متعب تحت شجرة ونام قليلاً. عند استيقاظه، شكر الشجرة على ظلها وثمرها. العبرة: اشكر دائمًا من يساعدك.",
  },
  {
    titulo: "El ratón de campo y el ratón de ciudad",
    es: "Un ratón de campo invitó a su amigo de la ciudad a comer. La comida era sencilla pero tranquila. Cuando fueron a la ciudad, había mucha comida pero también muchos peligros. Moraleja: Mejor poco y seguro que mucho y peligroso.",
    ar: "دعا فأر الريف صديقه فأر المدينة لتناول الطعام معه. كان الطعام بسيطًا لكن الجو هادئ. وعندما ذهبا إلى المدينة، كان هناك الكثير من الطعام لكن المخاطر كثيرة. العبرة: القليل الآمن خير من الكثير الخطر.",
  },
  {
    titulo: "El burro y la carga de sal",
    es: "Un burro llevaba sacos de sal y, al cruzar un río, se cayó. La sal se disolvió y la carga se hizo más ligera. Al día siguiente, el burro se dejó caer de nuevo, pero esta vez llevaba esponjas y la carga se hizo más pesada. Moraleja: No siempre funciona repetir los mismos trucos.",
    ar: "كان هناك حمار يحمل أكياس ملح، وعندما عبر النهر سقط فذاب الملح وخف الحمل. في اليوم التالي تعمد السقوط، لكن الحمولة كانت إسفنجًا فامتص الماء وأصبح الحمل أثقل. العبرة: ليس كل الحيل تنجح دائماً.",
  },
  {
    titulo: "La gallina de los huevos de oro",
    es: "Un campesino tenía una gallina que ponía un huevo de oro cada día. Queriendo obtener todos los huevos de una vez, la mató, pero no encontró nada. Moraleja: La avaricia rompe el saco.",
    ar: "كان لدى فلاح دجاجة تبيض بيضة ذهبية كل يوم. أراد أن يحصل على كل الذهب مرة واحدة فذبح الدجاجة ولم يجد شيئًا. العبرة: الطمع يفسد كل شيء.",
  },
  {
    titulo: "El viento y el sol",
    es: "El viento y el sol discutían sobre quién era más fuerte. Vieron a un hombre con abrigo y apostaron quién lograría que se lo quitara. El viento sopló fuerte, pero el hombre se abrigó más. El sol brilló cálidamente y el hombre se quitó el abrigo. Moraleja: La suavidad puede más que la fuerza.",
    ar: "تجادل الريح والشمس حول من الأقوى. رأيا رجلاً يرتدي معطفًا وقررا أن من يجعله يخلعه هو الأقوى. نفخ الريح بقوة فتمسك الرجل بمعطفه أكثر. أشرقت الشمس بلطف فخلع الرجل معطفه. العبرة: اللطف أقوى من العنف.",
  },
  {
    titulo: "El perro y su reflejo",
    es: "Un perro llevaba un trozo de carne y, al mirar su reflejo en el agua, creyó ver a otro perro con más carne. Intentó quitársela y perdió la suya. Moraleja: Por codicioso, lo perdió todo.",
    ar: "كان هناك كلب يحمل قطعة لحم. رأى انعكاسه في الماء فظن أن هناك كلبًا آخر معه قطعة أكبر. حاول أن يأخذها فسقطت قطعته في الماء وخسر كل شيء. العبرة: الطمع يضيع كل شيء.",
  },
  {
    titulo: "El cuervo y la jarra",
    es: "Un cuervo sediento encontró una jarra con poca agua. Metió piedras poco a poco hasta que el agua subió y pudo beber. Moraleja: La inteligencia vence a la fuerza.",
    ar: "وجد غراب عطشان جرة فيها ماء قليل. بدأ يضع الحصى فيها حتى ارتفع الماء وشرب. العبرة: الذكاء يغلب القوة.",
  },
  {
    titulo: "El lobo y la grulla",
    es: "Un lobo tenía un hueso atravesado en la garganta. Pidió ayuda a una grulla, que con su largo pico se lo sacó. El lobo no le dio las gracias. Moraleja: No esperes gratitud de los malvados.",
    ar: "كان لدى الذئب عظمة عالقة في حلقه. طلب من طائر الكركي أن يساعده، فأدخل منقاره الطويل وأخرج العظمة. لم يشكره الذئب. العبرة: لا تتوقع الشكر من الأشرار.",
  },
  {
    titulo: "La liebre y la tortuga",
    es: "La liebre se burlaba de la lentitud de la tortuga. Hicieron una carrera. La liebre, confiada, se durmió y la tortuga ganó. Moraleja: La constancia vence a la rapidez.",
    ar: "كانت الأرنب تسخر من بطء السلحفاة. قررا التسابق. الأرنب واثقة نامت أثناء السباق وفازت السلحفاة. العبرة: المثابرة تغلب السرعة.",
  },
  {
    titulo: "El asno disfrazado de león",
    es: "Un asno se puso una piel de león y asustaba a todos. Pero su voz lo delató. Moraleja: El hábito no hace al monje.",
    ar: "ارتدى الحمار جلد أسد وأخاف الجميع. لكن صوته كشفه. العبرة: المظاهر لا تصنع الجوهر.",
  },
  {
    titulo: "El ratón y la rana",
    es: "Un ratón y una rana se hicieron amigos. La rana ató al ratón a su pata y saltó al agua. El ratón se ahogó y la rana fue atrapada por un milano. Moraleja: El mal que haces se te vuelve en contra.",
    ar: "تصادق فأر وضفدع. ربط الضفدع الفأر بقدمه وقفز إلى الماء فغرق الفأر وأمسك طائر الحدأة بالضفدع. العبرة: الشر يعود على صاحبه.",
  },
  {
    titulo: "El zorro y el cuervo",
    es: "Un cuervo tenía un trozo de queso. El zorro lo halagó para que cantara y, al abrir el pico, cayó el queso y el zorro se lo llevó. Moraleja: Cuidado con los aduladores.",
    ar: "كان لدى الغراب قطعة جبن. مدحه الثعلب حتى غنى، فسقط الجبن وأخذه الثعلب. العبرة: احذر من المتملقين.",
  },
  {
    titulo: "El ciervo en la fuente",
    es: "Un ciervo se miró en una fuente y se enorgulleció de sus cuernos, pero despreciaba sus patas. Cuando llegó el cazador, sus patas lo salvaron, pero sus cuernos se enredaron. Moraleja: No desprecies lo útil.",
    ar: "نظر غزال إلى نفسه في الماء فأعجب بقرونه واحتقر ساقيه. عندما جاء الصياد أنقذته ساقاه لكن قرونه علقت. العبرة: لا تحتقر ما هو مفيد.",
  },
  {
    titulo: "El gato y los ratones",
    es: "Unos ratones sufrían por un gato que los cazaba. Decidieron ponerle un cascabel para oírlo llegar, pero nadie se atrevió a ponérselo. Moraleja: Es fácil proponer, difícil ejecutar.",
    ar: "عانت الفئران من قط يصطادها. قررت أن تضع له جرسًا لتسمعه عند قدومه، لكن لم يجرؤ أحد على ذلك. العبرة: من السهل الاقتراح، لكن التنفيذ صعب.",
  },
  {
    titulo: "El molino mágico",
    es: "Un molino mágico podía producir todo lo que se le pidiera. Un hombre codicioso no supo detenerlo y el molino inundó todo de sal. Moraleja: El exceso y la codicia traen problemas.",
    ar: "كان هناك طاحونة سحرية تنتج كل ما يُطلب منها. رجل طماع لم يعرف كيف يوقفها فغرقت الدنيا بالملح. العبرة: الطمع والإفراط يجلبان المشاكل.",
  },
  {
    titulo: "La cigarra y la hormiga",
    es: "La cigarra cantó todo el verano mientras la hormiga trabajaba. Cuando llegó el invierno, la cigarra pidió comida y la hormiga le dijo que hubiera trabajado. Moraleja: Hay que prepararse para el futuro.",
    ar: "غنت الجرادة طوال الصيف بينما كانت النملة تعمل. وعندما جاء الشتاء طلبت الجرادة الطعام فقالت لها النملة: كان عليك أن تعملي. العبرة: يجب الاستعداد للمستقبل.",
  },
  {
    titulo: "El zorro y las gallinas",
    es: "Un zorro hambriento intentó entrar al gallinero. Las gallinas, alertas, no se dejaron engañar. Moraleja: La astucia no siempre vence a la precaución.",
    ar: "حاول ثعلب جائع دخول حظيرة الدجاج. لكن الدجاج كان يقظًا ولم ينخدع. العبرة: الذكاء لا يغلب الحذر دائماً.",
  },
  {
    titulo: "Pedro y el clavo",
    es: "Pedro era muy iracundo. Su padre le dio un clavo para cada vez que se enfadara y luego debía quitarlos al calmarse. Al final, el daño de los clavos quedó en la puerta. Moraleja: Las palabras pueden dejar heridas.",
    ar: "كان بيدرو سريع الغضب. أعطاه والده مسمارًا ليضعه في الباب كلما غضب، ثم ينزعه عندما يهدأ. بقيت آثار المسامير. العبرة: الكلام الجارح يترك أثراً.",
  },
  {
    titulo: "El sabio y el escorpión",
    es: "Un sabio salvó a un escorpión del agua y este le picó. Alguien le preguntó por qué seguía ayudando y respondió: “Es su naturaleza, la mía es ayudar”. Moraleja: Haz el bien sin esperar recompensa.",
    ar: "أنقذ حكيم عقربًا من الماء فلدغه. سأله أحدهم لماذا يساعده فقال: هذه طبيعته، وطبيعتي أن أساعد. العبرة: افعل الخير دون انتظار مقابل.",
  },
  {
    titulo: "El árbol generoso",
    es: "Un árbol daba sombra y frutos a todos. Cuando lo cortaron, todos lo extrañaron. Moraleja: Solo valoramos lo que tenemos cuando lo perdemos.",
    ar: "كانت هناك شجرة تعطي الجميع الظل والثمر. وعندما قطعها الناس، شعروا بفقدانها. العبرة: لا نقدر الأشياء إلا بعد فقدانها.",
  },
  {
    titulo: "La oveja negra",
    es: "En un rebaño, una oveja negra era rechazada por las demás. Un día, al salvarlas del lobo, todas la aceptaron. Moraleja: Todos tenemos un valor único.",
    ar: "كان هناك قطيع من الغنم فيه نعجة سوداء لم يحبها الآخرون. في يوم من الأيام أنقذتهم من الذئب فأحبوها. العبرة: لكل منا قيمة فريدة.",
  },
  {
    titulo: "El niño y los caramelos",
    es: "Un niño metió la mano en un frasco de caramelos y no podía sacarla por querer muchos. Solo pudo cuando tomó menos. Moraleja: La avaricia no lleva a nada bueno.",
    ar: "أدخل طفل يده في جرة حلوى وأراد أخذ الكثير فلم يستطع إخراج يده. عندما أخذ القليل فقط أخرجها بسهولة. العبرة: الطمع لا ينفع.",
  },
  {
    titulo: "El pescador y el pez pequeño",
    es: "Un pescador atrapó un pez pequeño que le pidió que lo soltara, prometiendo volver cuando fuera grande. El pescador no aceptó. Moraleja: Más vale poco seguro que mucho incierto.",
    ar: "أمسك صياد سمكة صغيرة طلبت منه أن يتركها لتكبر وتعود. لم يوافق الصياد. العبرة: القليل المضمون خير من الكثير المجهول.",
  },
  {
    titulo: "El águila y la tortuga",
    es: "Una tortuga quería volar como el águila. El águila la llevó alto y la soltó, y la tortuga cayó. Moraleja: No desees lo que no es para ti.",
    ar: "أرادت سلحفاة أن تطير مثل النسر. حملها النسر عالياً ثم تركها فسقطت. العبرة: لا تتمنى ما ليس لك.",
  },
  {
    titulo: "El perro y el lobo",
    es: "Un perro doméstico presumía de su vida ante un lobo hambriento. El lobo prefirió la libertad antes que la comodidad con cadenas. Moraleja: La libertad es más valiosa que el confort.",
    ar: "كان كلب مدلل يفتخر أمام ذئب جائع بحياته. فضل الذئب الحرية على الراحة مع القيود. العبرة: الحرية أغلى من الراحة.",
  },
  {
    titulo: "El mono y los peces",
    es: "Un mono quiso salvar a los peces sacándolos del agua y los mató. Moraleja: No ayudes sin entender la situación.",
    ar: "أراد قرد أن ينقذ الأسماك فأخرجها من الماء فماتت. العبرة: لا تساعد دون فهم الموقف.",
  },
  {
    titulo: "El leñador honrado",
    es: "Un leñador perdió su hacha en el río. Un ángel le ofreció una de oro, una de plata y la suya. Eligió la suya y recibió las tres. Moraleja: La honestidad tiene recompensa.",
    ar: "فقد حطاب فأسه في النهر. عرض عليه ملاك فأسًا ذهبية وأخرى فضية وأخيرًا فأسه. اختار فأسه فكافأه الملاك بالجميع. العبرة: الصدق مكافأته عظيمة.",
  },
  {
    titulo: "El ratón vanidoso",
    es: "Un ratón quería casarse solo con quien tuviera más poder. Rechazó al sol, la nube, el viento y la montaña, y al final eligió a otro ratón. Moraleja: No desprecies a los tuyos.",
    ar: "أراد فأر أن يتزوج من الأقوى. رفض الشمس والسحابة والريح والجبل وفي النهاية اختار فأرة مثله. العبرة: لا تحتقر من هم مثلك.",
  },
  {
    titulo: "La zorra y el gallo",
    es: "Una zorra quiso engañar a un gallo para que bajara del árbol. El gallo fingió ver perros y la zorra huyó. Moraleja: La astucia puede vencer al engaño.",
    ar: "حاولت ثعلبة خداع ديك لينزل من الشجرة. ادعى الديك أنه يرى كلابًا فهربت الثعلبة. العبرة: الذكاء قد يغلب الخداع.",
  },
  {
    titulo: "El pastor y las cabras",
    es: "Un pastor cuidaba cabras ajenas mejor que las suyas. Cuando las ajenas volvieron con su dueño, las suyas ya no confiaron en él. Moraleja: Atiende bien lo que es tuyo.",
    ar: "كان راعٍ يهتم بغنم الآخرين أكثر من غنمه. وعندما عادت الغنم لأصحابها، لم تثق به أغنامه. العبرة: اعتنِ بما تملك.",
  },
  {
    titulo: "El pajarito herido",
    es: "Un pajarito herido fue cuidado por una niña. Cuando sanó, volvió a volar pero nunca olvidó a la niña. Moraleja: La gratitud permanece.",
    ar: "عصفور صغير جريح اعتنت به فتاة. عندما شفي عاد للطيران ولم ينسها أبدًا. العبرة: الامتنان يبقى.",
  },
  {
    titulo: "El rey y el sabio",
    es: "Un rey preguntó a un sabio qué era lo más importante en la vida. El sabio respondió: saber cuándo hablar, cuándo callar y cuándo actuar. Moraleja: La sabiduría es saber elegir el momento.",
    ar: "سأل ملك حكيمًا عن أهم شيء في الحياة. أجاب الحكيم: أن تعرف متى تتكلم، متى تصمت، ومتى تتصرف. العبرة: الحكمة في اختيار الوقت المناسب.",
  },
  {
    titulo: "El ciervo y el león",
    es: "Un ciervo, al verse reflejado en el agua, admiró sus cuernos y despreció sus patas. Cuando un león lo persiguió, sus patas lo salvaron y sus cuernos lo retrasaron. Moraleja: No desprecies lo útil.",
    ar: "نظر غزال إلى انعكاسه فأعجب بقرونه واحتقر ساقيه. عندما طارده الأسد أنقذته ساقاه وعلقت قرونه. العبرة: لا تحتقر ما هو مفيد.",
  },
  {
    titulo: "El gallo y la perla",
    es: "Un gallo encontró una perla y la despreció porque no le servía de alimento. Moraleja: No todos valoran lo que no entienden.",
    ar: "وجد ديك لؤلؤة فاحتقرها لأنها لا تؤكل. العبرة: ليس كل شيء له قيمة للجميع.",
  },
  {
    titulo: "La zorra sin cola",
    es: "Una zorra perdió su cola en una trampa. Intentó convencer a las demás de que era mejor sin cola, pero no la creyeron. Moraleja: No sigas a quien te quiere hacer perder.",
    ar: "فقدت ثعلبة ذيلها في فخ وحاولت إقناع الأخريات أن الحياة أفضل بدون ذيل فلم يصدقنها. العبرة: لا تتبع من يريد لك الخسارة.",
  },
  {
    titulo: "El cuervo y la serpiente",
    es: "Un cuervo robó un trozo de carne y una serpiente lo atacó para quitárselo. Ambos perdieron la carne. Moraleja: La pelea por ambición puede dejarte sin nada.",
    ar: "سرق غراب قطعة لحم فهاجمته أفعى لأخذها. خسر الاثنان اللحم. العبرة: الطمع والنزاع يؤديان للخسارة.",
  },
  {
    titulo: "El hombre y el león",
    es: "Un hombre y un león discutían sobre quién era más fuerte. El hombre mostró una estatua de un hombre venciendo a un león. El león dijo: Si los leones esculpieran, verías lo contrario. Moraleja: Cada uno cuenta la historia a su favor.",
    ar: "تناقش رجل وأسد حول من الأقوى. أشار الرجل إلى تمثال لرجل يهزم أسدًا. قال الأسد: لو نحت الأسود لكانت القصة معكوسة. العبرة: كل يروي القصة لصالحه.",
  },
  {
    titulo: "El burro y el león disfrazado",
    es: "Un burro se puso una piel de león y asustó a todos. Pero al rebuznar, todos lo reconocieron. Moraleja: La apariencia engaña, pero la verdad se revela.",
    ar: "ارتدى حمار جلد أسد وأخاف الجميع. لكن عندما نهق عرفوه. العبرة: المظاهر خداعة لكن الحقيقة تظهر.",
  },
];

import { useRouter } from "expo-router";

export default function CuentosPopularesScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.volverBtn}
          onPress={() => router.push("/")}
        >
          <Text style={styles.volverBtnText}>⟵ Volver a la Pantalla de Inicio</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Cuentos Populares Españoles</Text>
        {cuentos.map((cuento, idx) => (
          <View key={idx} style={styles.cuentoBox}>
            <Text style={styles.cuentoTitulo}>{cuento.titulo}</Text>
            <Text style={styles.cuentoEs}>{cuento.es}</Text>
            <TouchableOpacity
              style={styles.listenButton}
              onPress={() => Speech.speak(cuento.es, { language: "es-ES" })}
            >
              <Text style={styles.listenButtonText}>Escuchar en español</Text>
            </TouchableOpacity>
            <Text style={styles.cuentoAr}>{cuento.ar}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  volverBtn: {
    backgroundColor: '#9DC3AA',
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 20,
    marginBottom: 16,
    alignSelf: "flex-start",
    shadowColor: "#0003",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 4,
  },
  volverBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
    textAlign: "center",
  },
  container: {
    padding: 18,
    paddingBottom: 30,
    backgroundColor: "#fffbe6",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: '#9DC3AA',
    marginBottom: 18,
    textAlign: "center",
  },
  cuentoBox: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginBottom: 22,
    padding: 16,
    shadowColor: "#0003",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  cuentoTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#9DC3AA',
    marginBottom: 8,
    textAlign: "left",
  },
  cuentoEs: {
    fontSize: 15,
    color: "#222",
    marginBottom: 6,
    textAlign: "left",
  },
  cuentoAr: {
    fontSize: 15,
    color: '#000',
    marginBottom: 2,
    textAlign: "right",
    writingDirection: "rtl",
    fontFamily: "System",
  },
  cuentoImagen: {
    width: "100%",
    height: 120,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: "#eee",
  },
  listenButton: {
    backgroundColor: '#9DC3AA',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  listenButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
