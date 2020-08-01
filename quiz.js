const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const prefix = botconfig.prefix

const Entities = require('html-entities').XmlEntities;

const entities = new Entities()

function parseHtmlEnteties(str) {
    return str.replace(/&#([0-9]{1,3});/gi, function(match, numStr) {
        var num = parseInt(numStr, 10); // read num as normal number
        return String.fromCharCode(num);
    });
}



var triviaAPIurl = `https://opentdb.com/api.php?amount=1`

let fetch = require('node-fetch')

function shuffle2(array) {
    array.sort(() => Math.random() - 0.5);
}

function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

module.exports.run = async (bot, message, args, prefix) => {
    
    
    
    let difficulty = args[0]
    //if(args[0] && difficulty == "easy" || "medium" || "hard") return message.channel.send("Not an Available difficulty\n**Difficulties**: ``Easy`` ``Medium`` ``Hard``")

    let triviaType = args[1]
    //if(args[1] && triviaType !== "multiple" || "truefalse") return message.channel.send("Not an Available type\n**Types**: ``Multiple`` ``TrueFalse``")
    if(triviaType == "truefalse") triviaType = "boolean"
    if(triviaType == "trueorfalse") triviaType = "boolean"
    if(triviaType == "multiplechoice") triviaType = "multiple"
    if(triviaType == "multiplechoices") triviaType = "multiple"

    if(difficulty) {triviaAPIurl = `${triviaAPIurl}&difficulty=${difficulty.toLowerCase()}`}
    
    if(triviaType) {triviaAPIurl = `${triviaAPIurl}&type=${triviaType.toLowerCase()}`}

    if(!args[0]) {triviaAPIurl = `https://opentdb.com/api.php?amount=1`}


    console.log(triviaAPIurl)

    fetch(triviaAPIurl)
    .then(res => res.json())
    .then(data => {
        console.log(data)

        
        let dataCategory = data["results"][0]["category"]
        let dataType = data["results"][0]["type"]

        if(dataType == "boolean") {
            dataType = "True Or False"
        } else { dataType = "Multiple Choices"} 

        let dataDifficulty = data['results'][0]['difficulty']
        
        if(dataDifficulty == "easy") {
            dataDifficulty = "Easy "
        } else if(dataDifficulty == "medium") {
            dataDifficulty = "Medium"
        } else { dataDifficulty = "Hard"} 

        let dataQuestion = data['results'][0]['question']

        let dataCorrectAnswer = data['results'][0]['correct_answer']
        let dataIncorrectAnswer = data['results'][0]['incorrect_answers']

        console.log('mylene-1')



        let dataAnswersArray = dataCorrectAnswer + ',' + dataIncorrectAnswer.toString()

        console.log(dataAnswersArray)
        let dataShuffledAnswersTemp = dataAnswersArray.split(',')
        
        
        let dataShuffledAnswers1 = shuffle(dataShuffledAnswersTemp)
        let dataShuffledAnswers = dataShuffledAnswers1.toString().replace(/,/g, '\n')
        if(dataShuffledAnswers.toString().toLowerCase().includes('true'|| 'false')) {
            dataShuffledAnswers = 'True\nFalse'
        }

        console.log('kendrick2')
        const embed = new Discord.MessageEmbed()
        .setColor(colours.cornflowerblue) // Blurple.
        .setThumbnail('https://opentdb.com/images/logo.png')
        .setAuthor('Open Trivia DATABASE', message.author.displayAvatarURL())
        .setTitle('Trivia Question')
        .addFields(
            { name: 'Categorie', value: dataCategory},
            { name: 'Difficulty', value:dataDifficulty, inline: true},
            { name: 'Type', value: dataType, inline: true},
            { name: 'Question', value: parseHtmlEnteties(entities.decode(dataQuestion)) },
            { name: 'Answers', value: parseHtmlEnteties(entities.decode(dataShuffledAnswers)) }
        )
        .setTimestamp()
        .setFooter(botconfig.embedfooter, bot.user.displayAvatarURL());
        message.channel.send(embed);
        console.log('kendrick1')
        
        const filter = m => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(filter, m => m.author.id === message.author.id, { time: 25000 ,idle: 15000, errors: ['time'] });
        collector.on('collect', message => {
            if (message.content.toLowerCase() == parseHtmlEnteties(entities.decode(dataCorrectAnswer.toLowerCase()))) {
                message.channel.send("Correct! You got the Question Right!");
                collector.stop()
            } else if(message.content.toLowerCase().startsWith(`${prefix}trivia`) || message.content.toLowerCase().startsWith(`${prefix}quiz`) || message.content.toLowerCase().startsWith(`${prefix}question`)){
                collector.stop()
                
            } else {
                message.channel.send(`Too bad, you're wrong. The Correct Answer was ${parseHtmlEnteties(entities.decode(dataCorrectAnswer))}`);
                collector.stop()
                console.log(`${prefix}trivia`)
            }
        })
        collector.on('end', (collected, reason) => {
            if(!collected) {
                message.channel.send('Oh no! You ran out of time')
                console.log('Oh no ran out of time')
            }
            collector.stop()
        });

        
        //const answer = await message.channel.awaitMessages(filter, {maxMatches: 1, time: 25000, errors: ['time', 'maxMatches']});
        //const ans = answer.first();
        //if(ans.content.toLowerCase() === dataCorrectAnswer.toLowerCase()){
        //    message.channel.send(`Congratulations ${message.author.username}! You got the question right!`)
        //} else {
        //    message.channel.send('Too bad, the Question is Incorrect.')
        //}
        
      })
    .catch( err => {
        //err.message("thien").then( errorMessage => {
        //  this.props.dispatch(displayTheError(errorMessage))
        //})
        console.error(err)
        message.channel.send('An error occured')
    })
    triviaAPIurl = `https://opentdb.com/api.php?amount=1`
} 



module.exports.config = {
    name: "trivia",
    description: "Randomly generated question",    
    usage: "!trivia *<difficulty> *<type>\n**Difficulties**: ``Easy`` ``Medium`` ``Hard``\n**Types**: ``Multiple`` ``TrueFalse",
    accessableby: "Members",
    aliases: ["question", "quiz"]
}