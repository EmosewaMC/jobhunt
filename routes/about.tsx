import { Head } from "$fresh/runtime.ts";

export default function JobhuntArchive() {
  return (
    <>
        <h1>Jobhunt.io Archival Website</h1>
        <h2>Introduction</h2>
        <p>
          We made a vertical slice of our game, Jobhunt.io, for a university
          course we have taken together, with the exception of our external
          help.
        </p>
        <p>Here is an embedded video of our game in action:</p>
        {/* <!--video width="500px" height="500px" controls="controls"-->
            <!--source src=".mp4" type="video/mp4" /-->
        <!--/video--> */}
        <p>We did it on a team consisting of:</p>
        <ul>
          <li>Engine Lead: Aaron Lee</li>
          <li>Tools Lead: Dave Markowitz</li>
          <li>Production Lead: Montserrat Fausto</li>
          <li>Art/Playtesting Lead: Nick Tung</li>
          <li>Design Lead: Thanyared Wong</li>
          <li>External Splash Artist: Eliana Cadelina</li>
        </ul>
        <h2>Design Constraints</h2>
        <p>Our game was designed under the following externally imposed constraints:</p>
        <h3>Accessibility</h3>
        <h4>Vision:</h4>
        <p>
          For the vision constraint, our team was tasked with making sure our
          game can be completed using a high contrast grayscale image filter.
          Our current color scheme is contrasting enough even when applying
          colorblind filters so a player can easily distinguish between the
          items on the screen.
        </p>
        <h4>Touch:</h4>
        <p>
          For the touch constraint, our team was tasked with making sure our
          game can be completed using a single hand (but another hand may help).
          To play our game, if a player were to play on their PC/Laptop, all
          they would need is access to a mouse/trackpad to help them navigate
          through the game by right clicking on specific events. If played on a
          mobile device, all the player would really need to play is at least
          one finger to tap on the screen and trigger certain events.
        </p>
        <h4>Hearing:</h4>
        <p>
          For the hearing constraint, our team was tasked with making sure our
          game can be completed with no auditory information (but sonic art is
          appreciated). Our game is currently implemented without sound so a
          player with hearing impairments can have the same experience as
          someone without them.
        </p>
        <h4>Rest:</h4>
        <p>
          For the rest constraint, our team was tasked with making sure active
          play can always reach a natural resting point within two minutes
          without the need to actively pause the game. As we do not have any
          active timers implemented affecting gameplay, players can take a step
          away from the game whenever they want and not face any penalties.
        </p>
        <h3>Localization:</h3>
        <p>
          For the localization requirements, our team was tasked with providing
          language support for two different written languages, with at least
          one language using either a logographic script or a right-to-left
          script.
        </p>
        <p>Currently Supported Languages:</p>
        <ul>
          <li>English (US)</li>
          <li>Mandarin</li>
          <li>Arabic</li>
        </ul>
        <h3>Game Format</h3>
        <p>
          We have a working live, server-side component that is playable on
          mobile browsers and can use unlimited network data transfer during
          play.
        </p>
        <h2>Playable Game Link</h2>
        <p>
          Here is where you can either directly play or download our game:{" "}
          jobhunt.deno.dev/
        </p>
        <h2>Prototypes</h2>
        <p>Here are some prototype we made along the way:</p>
        <h3><i>Sprint 1</i></h3>
        <h4>Core Gameplay</h4>
        {/* <!--img src=".jpg" alt="" width="500" height="333"--> */}
        <ul>
          <li>
            <b>Design Question:</b>What is the right framework for the
            gameplay/frontend?
          </li>
          <li>
            <b>Knowledge Gained:</b>We learned that Phaser has a lot of
            technical debt that needs to be paid that might not be worth it. We
            are investigating other tools that may be more suitable for our
            purposes.
          </li>
        </ul>
        <h4>Core Gameplay</h4>
        {/* <!--img src=".jpg" alt="" width="500" height="333"--> */}
        <ul>
          <li>
            <b>Design Question:</b>What are the challenges and pros/cons of
            using different tools?
          </li>
          <li>
            <b>Knowledge Gained:</b>When we marry the results of the server
            prototypes and gameplay prototypes, we will know what the best tool
            for our needs is.
          </li>
        </ul>
        <h4>Deployment</h4>
        {/* <!--img src=".jpg" alt="" width="500" height="333"-->
            <!--img src=".jpg" alt="" width="500" height="333"--> */}
        <ul>
          <li>
            <b>Design Question:</b>What can we implement to show a basic
            understanding of how a client and a server would communicate?
          </li>
          <li>
            <b>Knowledge Gained:</b>We have a long term storage method (SQLite)
            and a simple to update, easy implementation for duplication of
            messages from any source (client-&gt;client, client-&gt;server, and
            v.v).
          </li>
        </ul>
        <h3><i>Sprint 2</i></h3>
        <h4>Deployment</h4>
        {/* <!--img src=".jpg" alt="" width="500" height="333"--> */}
        <ul>
          <li>
            <b>Design Questions:</b>
          </li>
          <ul>
            <li>
              How do we provide an easy way to have basic cross platform account
              management?
            </li>
            <li>Where should we actually be hosting our service?</li>
            <li>How does the new architecture work?</li>
          </ul>
          <li>
            <b>Knowledge Gained:</b>
          </li>
          <ul>
            <li>
              Using a homemade one would require good security and pen-testing,
              something that is far more effort than a prototype right now, so
              we opted to use Google OAuth.
            </li>
            <li>
              AWS was chosen initially, however Deno Deploy was chosen instead
              for being cheaper and easier to use with our runtime.
            </li>
            <li>
              This was a new tech for the team, so we had to spend time
              understanding what we were working with and how it would be
              communicated to the end user.
            </li>
          </ul>
        </ul>
        <h4>Splash Experience</h4>
        {/* <!--img src=".jpg" alt="" width="500" height="333"--> */}
        <ul>
          <ul>
            <li>
              <b>Design Questions:</b>
            </li>
            <ul>
              <li>
                Can someone who is colorblind have the same experience as
                someone who is not?
              </li>
              <li>
                Which opening sequence provides a more immersive experience for
                the player? Loading into the map or the hub?
              </li>
            </ul>
            <li>
              <b>Knowledge Gained:</b>
            </li>
            <ul>
              <li>
                Make sure the color scheme is consistent and contrasting
                throughout the entire experience to avoid confusion.
              </li>
              <li>
                As long as we play into our game's current strengths and themes,
                players will be more likely to accept our initial progression
                into the game with the map.
              </li>
            </ul>
          </ul>
        </ul>
        <h4>Scene Flow</h4>
        {/* <!--img src=".jpg" alt="" width="500" height="333"-->
            <!--img src=".jpg" alt="" width="500" height="333"--> */}
        <ul>
          <li>
            <b>Design Questions:</b>
          </li>
          <ul>
            <li>Is it possible to use Leaflet with our custom map?</li>
            <li>
              Can we redirect to another page (our interview screen) using
              location markers?
            </li>
          </ul>
          <li>
            <b>Knowledge Gained:</b>
          </li>
          <ul>
            <li>
              We can use a custom map with Leaflet, but specific dimensions and
              boundaries must be known to configure the map properly.
            </li>
            <li>
              Redirection was very simple, and just used a URL to move to the
              interview screen. It will also be easy to implement more markers
              for the future.
            </li>
          </ul>
        </ul>
        <h2>Contributor Highlights</h2>
        <p>Here are the highlights of what each contributor contributed:</p>
        <ul>
          <li>Aaron Lee:</li>
          <li>Dave Markowitz:</li>
          <li>
            Monserrat Fausto: As the producer, my contributions to the project
            included developing and maintaining scheduled meetings, overseeing
            creative and technical development of the game, and ensuring timely
            delivery of deliverables.
          </li>
          <li>Nick Tung:</li>
          <li>Thanyared Wong:</li>
          <li>
            Eliana Cadelina (External): As the splash artist, my contributions
            included producing the Title and Loading Screens for the game.
          </li>
        </ul>
    </>
  );
}