using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LanguAI.Backend.Migrations
{
    /// <inheritdoc />
    public partial class insertsomecard : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO [Card] (WordInNativeLanguage, WordInLearningLanguage, CardListId) VALUES" +
                "('család', 'family', 1)," +
                "('anya', 'mother', 1)," +
                "('apa', 'father', 1)," +
                "('lánytestvér', 'sister', 1)," +
                "('fiútestvér', 'brother', 1)," +
                "('szülők', 'parents', 1)," +
                "('gyerekek', 'children', 1)," +
                "('fiúgyermek', 'son', 1)," +
                "('leánygyermek', 'daughter', 1)," +
                "('nagymama', 'grandmother', 1)," +
                "('nagypapa', 'grandfather', 1)," +
                "('nagynéni', 'aunt', 1)," +
                "('nagybácsi', 'uncle', 1)," +
                "('unokatestvér', 'cousin', 1)," +
                "('baba', 'baby', 1)," +
                "('feleség', 'wife', 1)," +
                "('férj', 'husband', 1)," +
                "('házasság', 'marriage', 1)," +
                "('szeretet', 'love', 1)," +
                "('otthon', 'home', 1)," +
                "('rokon', 'relative', 1)," +
                "('mostohaapa', 'stepfather', 1)," +
                "('mostohaanya', 'stepmother', 1)," +
                "('ikrek', 'twins', 1)," +
                "('unokaöcs', 'nephew', 1)," +
                "('unokahúg', 'niece', 1)," +
                "('családfa', 'family tree', 1)," +
                "('együtt', 'together', 1)," +
                "('törődés', 'care', 1)," +
                "('támogatás', 'support', 1);");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM [Card] WHERE CardListId = 1 AND WordInLearningLanguage IN (" +
                "'family', 'mother', 'father', 'sister', 'brother', 'parents', 'children', 'son', 'daughter'," +
                "'grandmother', 'grandfather', 'aunt', 'uncle', 'cousin', 'baby', 'wife', 'husband', 'marriage'," +
                "'love', 'home', 'relative', 'stepfather', 'stepmother', 'twins', 'nephew', 'niece', 'family tree'," +
                "'together', 'care', 'support'" +
            ");");
        }
    }
}
