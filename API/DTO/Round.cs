using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DTO
{
    public class Round
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long RoundID { get; set; }
        //Foreign key 
        public int PlayerID { get; set; }
        //[ForeignKey("PlayerId")]
        public Player Player { get; set; }
        public long GamedID { get; set; }
        //[ForeignKey("GameId")]
        public Game Game { get; set; }
    }
}
