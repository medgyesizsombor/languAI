using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LanguAI.Backend.Migrations
{
    /// <inheritdoc />
    public partial class createlearninglanguagetopictables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Topic",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LanguageLevel = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NameInHun = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DescriptionInHun = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Topic", x => x.Id);
                });

            migrationBuilder.Sql("INSERT INTO Topic (LanguageLevel, Name, NameInHun, Description, DescriptionInHun) " +
                    "VALUES (2, 'Family1', 'Család1', 'Personal Particulars, Childhood, Studies, Appearance', 'Személyes adatok, Gyerekkor, Tanulmányok, Kinézet'), " +
                           "(2, 'Family2', 'Család2', 'Relatives, Relationships, Family Occasions, Holidays', 'Rokonok, Kapcsolatok, Családi események, Ünnepek'), " +
                           "(2, 'Daily Routine', 'Napi rutin', 'A Day''s Programme, Schools, Meals, Housework, Occupations', 'Egy nap programjai, Iskola, Étkezés, Házimunka, Foglalkozások'), " +
                           "(2, 'Housing', 'Lakhatás', 'Your Town / Village, Your House / Flat, Rooms and Furnishing', 'Városod / Falud, Házad / Lakásod, Szobák és Bútorozás'), " +
                           "(2, 'Hobbies and Jobs', 'Hobbik és Foglalkozások', 'Hobbies, Interests, Jobs, Careers', 'Hobbik, Érdeklődési körök, Munkák, Karrierek'), " +
                           "(2, 'Meals and Services', 'Étkezés és Szolgáltatások', 'Meals in the Home, Recipes, Restaurants, Shopping, At the Post Office', 'Ételek Otthon, Receptek, Éttermek, Vásárlás, A Postán'), " +
                           "(2, 'Health and Sports', 'Egészség és Sportok', 'At the Doctor''s, Illnesses, Symptoms, Sports and Games', 'Az Orvosnál, Betegségek, Tünetek, Sportok és Játékok'), " +
                           "(2, 'Weather and Clothing', 'Időjárás és Ruházat', 'Weather, Seasons, Clothing, Fashion', 'Időjárás, Évszakok, Ruházat, Divat'), " +
                           "(2, 'Traffic and Travelling', 'Közlekedés és Utazás', 'Public Transport, Directions, Travelling by Train / Plane, Travelling Abroad, At the Hotel', 'Tömegközlekedés, Útmutatók, Utazás Vonattal / Repülővel, Külföldi Utazás, A Szállodában'), " +
                           "(2, 'Entertainment', 'Szórakozás', 'Going out, Theatres, Cinemas, Films, Music, Newspapers, Libraries, Books', 'Kimozdulás, Színházak, Mozi, Filmek, Zene, Újságok, Könyvtárak, Könyvek'), " +
                           "(2, 'Telecommunication', 'Telekommunikáció', 'Television, Radio, Computer, Internet, Mobile Phones', 'Televízió, Rádió, Számítógép, Internet, Mobiltelefonok'), " +
                           "(2, 'Hungary and the English Speaking Countries', 'Magyarország és az Angol Nyelvű Országok', 'Geography, Political System, Capital Cities, Places of Interest', 'Földrajz, Politikai rendszer, Fővárosok, Nevezetességek'), " +
                           "(1, 'The Individual', 'Az Egyén', 'Personal Particulars, Appearance, Clothing, Daily Routine', 'Személyi Adatok, Külső Megjelenés, Ruházat, Napirend'), " +
                           "(1, 'Social Relationships', 'Társas Kapcsolatok', 'Family, Relatives, Friends, Colleagues / Classmates', 'Család, Rokonok, Barátok, Kollégák / Osztálytársak'), " +
                           "(1, 'Family', 'Család', 'Family Members, Family Events / Holidays', 'Családtagok, Családi Események / Ünnepek'), " +
                           "(1, 'Housing', 'Lakhatás', 'Your Town / Village, Your House / Flat, Rooms and Furnishing', 'Városod / Falud, Házad / Lakásod, Szobák és Bútorozás'), " +
                           "(1, 'Travel, Transportation', 'Utazás, Közlekedés', 'Means of Transport, Timetable / Transportation Information, Travel', 'Közlekedési Eszközök, Menetrend / Közlekedési Információk, Utazás'), " +
                           "(1, 'Shopping, Stores', 'Vásárlás, Üzletek', 'Store, Electronics Store, Market, At Clothing Store, At Grocery Store', 'Bolt, Műszaki Bolt, Piac, Ruházati Üzletben, Élelmiszerüzletben'), " +
                           "(1, 'Communication, Keeping in Touch', 'Kommunikáció, Kapcsolattartás', 'Post (Letter, Postcard), Telephone, Fax, SMS, Email', 'Posta (Levél, Képeslap), Telefon, Fax, SMS, E-mail'), " +
                           "(1, 'Services', 'Szolgáltatások', 'Restaurant (Menu, Ordering, Payment), Hotel (Room Reservation, Payment)', 'Étterem (Étlap, Rendelés, Fizetés), Szálloda (Szobafoglalás, Fizetés)'), " +
                           "(1, 'Culture, Entertainment', 'Kultúra, Szórakozás', 'Freetime Activities, Cinema, Theatre, Concert', 'Szabadidős Programok, Mozi, Színház, Koncert'), " +
                           "(1, 'Weather', 'Időjárás', 'Seasons, Weather, Rainy Weather, Wintertime / Snowfall', 'Évszakok, Időjárás, Esős Idő, Téli Idő / Havazás'), " +
                           "(1, 'Health', 'Egészség', 'At the Doctor''s, Diseases, Symptoms, Medications', 'Orvosnál, Betegségek, Tünetek, Gyógyszerek'), " +
                           "(1, 'Sport', 'Sport', 'Popular Sports, Soccer, Athletics, Sports', 'Ismertebb Sportágak, Labdarúgás, Atlétika, Sport'), " +
                           "(1, 'Media', 'Média', 'Television, Radio, Newspapers / Magazines ', 'Televízió, Rádió, Újságok / Folyóiratok'), " +
                           "(1, 'Hobby', 'Hobbi', 'Reading, Listening to Music, Computer Games', 'Olvasás, Zenehallgatás, Számítógépes Játékok'), " +
                           "(1, 'Learning / Working', 'Tanulás / Munka', 'Subjects, Popular Occupations, Workplaces, School / Work Schedule', 'Tantárgyak, Népszerű Foglalkozások, Munkahelyek, Iskolai / Munkahelyi Napirend'), " +
                           "(3, 'Family1', 'Család1', 'Family Roles, Values, Youth Problems, Divorce, Housing Shortage, Homelessness, Feminism', 'Családi Szerepek, Értékek, Ifjúsági Problémák, Válás, Lakáshiány, Hajléktalanság, Feminizmus'), " +
                           "(3, 'Family2', 'Család2', 'Children and Their Upbringing; Looking After Them, Rewarding, Punishing and Educating Them', 'Gyermekek és Nevelésük, Gondoskodás Róluk, Jutalmazás, Büntetés és Oktatás'), " +
                           "(3, 'Education', 'Oktatás', 'School types, Language Learning, Education in English-Speaking Countries, Rights of Students', 'Iskolatípusok, Nyelvtanulás, Oktatás Angolul Beszélő Országokban, Diákok Jogai'), " +
                           "(3, 'Jobs', 'Foglalkozások', 'Working in the European Union, Job Satisfaction, Priorities in Life, Unemployment', 'Dolgozni az Európai Unióban, Munkahelyi elégedettség, Életprioritások, Munkanélküliség'), " +
                           "(3, 'Travelling', 'Utazás', 'Travelling by Ship, Train, Plane, Coach; Camping, Tourism', 'Utazás Hajóval, Vonattal, Repülővel, Busszal; Kempingezés, Turizmus'), " +
                           "(3, 'Entertainment', 'Szórakozás', 'Entertainment, Internet, Computers, Media, Mobile Phones, Advertising', 'Szórakozás, Internet, Számítógépek, Média, Mobiltelefonok, Hirdetés'), " +
                           "(3, 'Sports', 'Sportok', 'Traditional sports, Olympics, Professionalism, Extreme Sports, Doping, Vandalism', 'Hagyományos Sportok, Olimpiai Játékok, Professzionalizmus, Extrém Sportok, Dopping, Vandalizmus'), " +
                           "(3, 'Health', 'Egészség', 'Diseases, Addictions, Smoking, Drugs, Alcohol, Vegetarianism, Healthy Diet', 'Betegségek, Függőségek, Dohányzás, Drogok, Alkohol, Vegetáriánus Életmód, Egészséges Étrend'), " +
                           "(3, 'Environment', 'Környezet', 'Environment Protection, Types of Pollution, Energy Resources, Recycling, Endangered Species, Life in Outer Space', 'Környezetvédelem, Szennyezés Típusai, Energiaforrások, Újrahasznosítás, Veszélyeztetett Fajok, Élet a Világűrben'), " +
                           "(3, 'Politics', 'Politika', 'Hungary, Political System, European Union, Living Standards, Economy, Industry, Agriculture, Infrastructure, Professional Army, Bearing Arms, Terrorism', 'Magyarország, Politikai Rendszer, Európai Unió, Életszínvonal, Gazdaság, Ipar, Mezőgazdaság, Infrastruktúra, Hivatásos Hadsereg, Fegyverviselés, Terrorizmus'), " +
                           "(3, 'The Consumer Society', 'A Fogyasztói Társadalom', 'Globalisation, Shopping, Advertisements, Consumerism', 'Globalizáció, Vásárlás, Hirdetések, Fogyasztói Szemlélet'), " +
                           "(3, 'Moral Issues', 'Morális Kérdések', 'Malnutrition, Abortion, Euthanasia, Capital Punishment, Cloning', 'Alultápláltság, Abortusz, Eutanázia, Halálbüntetés, Klónozás'), " +
                           "(3, 'Holiday and Superstitions', 'Ünnepek és babonák', 'Public Holidays, Religious Holidays and Festivals, British and American Holidays, Superstitions', 'Nemzeti Ünnepek, Vallási Ünnepek és Fesztiválok, Brit és Amerikai Ünnepek, Babonák'), " +
                           "(3, 'The Future', 'A Jövő', 'Future Hopes, Fears and Wishes', 'Jövőbeli Remények, Félelmek és Vágyak')");

            migrationBuilder.AddColumn<int>(
                name: "TopicId",
                table: "CardList",
                type: "int",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.CreateTable(
                name: "Language",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NameInHun = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Language", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Learning",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LanguageLevel = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    LanguageId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Learning", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Learning_Language_LanguageId",
                        column: x => x.LanguageId,
                        principalTable: "Language",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Learning_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CardList_TopicId",
                table: "CardList",
                column: "TopicId");

            migrationBuilder.CreateIndex(
                name: "IX_Learning_LanguageId",
                table: "Learning",
                column: "LanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_Learning_UserId",
                table: "Learning",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CardList_Topic_TopicId",
                table: "CardList",
                column: "TopicId",
                principalTable: "Topic",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.Sql("SET IDENTITY_INSERT Language ON; " +
                                 "INSERT INTO Language (Id, Code, Name, NameInHun) " +
                                                "VALUES(1, 'sq', 'Albanian', 'Albán'), " +
                                                      "(2, 'ar', 'Arabic', 'Arab'), " +
                                                      "(3, 'hy', 'Armenian', 'Örmény'), " +
                                                      "(4, 'awa', 'Awadhi', 'Avadhi'), " +
                                                      "(5, 'az', 'Azerbaijani', 'Azeri'), " +
                                                      "(6, 'ba', 'Bashkir', 'Baskír'), " +
                                                      "(7, 'eu', 'Basque', 'Baszk'), " +
                                                      "(8, 'be', 'Belarusian', 'Belorusz'), " +
                                                      "(9, 'bn', 'Bengali', 'Bengáli'), " +
                                                      "(10, 'bho', 'Bhojpuri', 'Bodzspuri'), " +
                                                      "(11, 'bs', 'Bosnian', 'Bosnyák'), " +
                                                      "(12, 'pt', 'Brazilian Portuguese', 'Brazíliai Portugál'), " +
                                                      "(13, 'bg', 'Bulgarian', 'Bolgár'), " +
                                                      "(14, 'zh', 'Cantonese (Yue)', 'Kantoni'), " +
                                                      "(15, 'ca', 'Catalan', 'Katalán'), " +
                                                      "(16, 'hne', 'Chhattisgarhi', 'Csatiszgari'), " +
                                                      "(17, 'zh', 'Chinese', 'Kínai'), " +
                                                      "(18, 'hr', 'Croatian', 'Horvát'), " +
                                                      "(19, 'cs', 'Czech', 'Cseh'), " +
                                                      "(20, 'da', 'Danish', 'Dán'), " +
                                                      "(21, 'doi', 'Dogri', 'Dogri'), " +
                                                      "(22, 'nl', 'Dutch', 'Holland'), " +
                                                      "(23, 'en', 'English', 'Angol'), " +
                                                      "(24, 'et', 'Estonian', 'Észt'), " +
                                                      "(25, 'fo', 'Faroese', 'Feröeri'), " +
                                                      "(26, 'fi', 'Finnish', 'Finn'), " +
                                                      "(27, 'fr', 'French', 'Francia'), " +
                                                      "(28, 'gl', 'Galician', 'Galíciai'), " +
                                                      "(29, 'ka', 'Georgian', 'Grúz'), " +
                                                      "(30, 'de', 'German', 'Német'), " +
                                                      "(31, 'el', 'Greek', 'Görög'), " +
                                                      "(32, 'gu', 'Gujarati', 'Gudzsaráti'), " +
                                                      "(33, 'bgc', 'Haryanvi', 'Haryanvi'), " +
                                                      "(34, 'hi', 'Hindi', 'Hindi'), " +
                                                      "(35, 'hu', 'Hungarian', 'Magyar'), " +
                                                      "(36, 'id', 'Indonesian', 'Indonéz'), " +
                                                      "(37, 'ga', 'Irish', 'Ír'), " +
                                                      "(38, 'it', 'Italian', 'Olasz'), " +
                                                      "(39, 'ja', 'Japanese', 'Japán'), " +
                                                      "(40, 'jv', 'Javanese', 'Jáva'), " +
                                                      "(41, 'kn', 'Kannada', 'Kannada'), " +
                                                      "(42, 'ks', 'Kashmiri', 'Kasmíri'), " +
                                                      "(43, 'kk', 'Kazakh', 'Kazah'), " +
                                                      "(44, 'gom', 'Konkani', 'Konkani'), " +
                                                      "(45, 'ko', 'Korean', 'Koreai'), " +
                                                      "(46, 'ky', 'Kyrgyz', 'Kirgiz'), " +
                                                      "(47, 'lv', 'Latvian', 'Lett'), " +
                                                      "(48, 'lt', 'Lithuanian', 'Litván'), " +
                                                      "(49, 'mk', 'Macedonian', 'Macedón'), " +
                                                      "(50, 'mai', 'Maithili', 'Maithili'), " +
                                                      "(51, 'ms', 'Malay', 'Maláj'), " +
                                                      "(52, 'mt', 'Maltese', 'Máltai'), " +
                                                      "(53, 'zh', 'Mandarin', 'Mandarin'), " +
                                                      "(54, 'zh', 'Mandarin Chinese', 'Mandarin Kínai'), " +
                                                      "(55, 'mr', 'Marathi', 'Maráthi'), " +
                                                      "(56, 'mwr', 'Marwari', 'Marvari'), " +
                                                      "(57, 'nan', 'Min Nan', 'Min Nan'), " +
                                                      "(58, 'ro', 'Moldovan', 'Moldáv'), " +
                                                      "(59, 'mn', 'Mongolian', 'Mongol'), " +
                                                      "(60, 'sr', 'Montenegrin', 'Montenegrói'), " +
                                                      "(61, 'ne', 'Nepali', 'Nepáli'), " +
                                                      "(62, 'no', 'Norwegian', 'Norvég'), " +
                                                      "(63, 'or', 'Oriya', 'Odia'), " +
                                                      "(64, 'ps', 'Pashto', 'Pastu'), " +
                                                      "(65, 'fa', 'Persian (Farsi)', 'Perzsa'), " +
                                                      "(66, 'pl', 'Polish', 'Lengyel'), " +
                                                      "(67, 'pt', 'Portuguese', 'Portugál'), " +
                                                      "(68, 'pa', 'Punjabi', 'Pandzsábi'), " +
                                                      "(69, 'raj', 'Rajasthani', 'Radzsasztáni'), " +
                                                      "(70, 'ro', 'Romanian', 'Román'), " +
                                                      "(71, 'ru', 'Russian', 'Orosz'), " +
                                                      "(72, 'sa', 'Sanskrit', 'Szanszkrit'), " +
                                                      "(73, 'sat', 'Santali', 'Szantali'), " +
                                                      "(74, 'sr', 'Serbian', 'Szerb'), " +
                                                      "(75, 'sd', 'Sindhi', 'Szindi'), " +
                                                      "(76, 'si', 'Sinhala', 'Szingaléz'), " +
                                                      "(77, 'sk', 'Slovak', 'Szlovák'), " +
                                                      "(78, 'sl', 'Slovene', 'Szlovén'), " +
                                                      "(79, 'uk', 'Ukrainian', 'Ukrán'), " +
                                                      "(80, 'ur', 'Urdu', 'Urdu'), " +
                                                      "(81, 'uz', 'Uzbek', 'Üzbég'), " +
                                                      "(82, 'vi', 'Vietnamese', 'Vietnámi'), " +
                                                      "(83, 'cy', 'Welsh', 'Walesi'), " +
                                                      "(84, 'wuu', 'Wu', 'Vu'); " +
                                 "SET IDENTITY_INSERT Language OFF; ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CardList_Topic_TopicId",
                table: "CardList");

            migrationBuilder.DropTable(
                name: "Learning");

            migrationBuilder.DropTable(
                name: "Topic");

            migrationBuilder.DropTable(
                name: "Language");

            migrationBuilder.DropIndex(
                name: "IX_CardList_TopicId",
                table: "CardList");

            migrationBuilder.DropColumn(
                name: "TopicId",
                table: "CardList");
        }
    }
}
