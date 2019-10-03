using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DTO
{
    public class Player
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PlayerID { get; set; }
        [Required]
        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Use letters only please")]
        public string Name { get; set; }
        //Foreign key 
        //public int? MoveId { get; set; }
        [ForeignKey("MoveId")]
        public Move Move { get; set; }
        //public long? GamedId { get; set; }
        [ForeignKey("GamedId")]
        public Game Game { get; set; }
    }
}
