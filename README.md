View more information about our submission here: https://devpost.com/software/wizardly-haunts

## Inspiration

When we first tried the Snap Spectacles, we noticed that they can only augment the center area of your vision and so anything that was displayed would vanish when you looked away. One of us joked that it would make a good ghost hunting mini game where you can only see the ghosts with the Snap Spectacles and so our idea was born.

## What it does

Our project is an AR wave based survival game where you are thrown right into the middle of a fight between wizards and the spooky ghosts. You can use the easy mobility allowed by the Snap Spectacles to run away from the ghosts or use a gesture to cast a spell and fight back. Some spells are easy to land but do little damage while others are hard to land but do a lot of damage - as such, different spells work best for different enemies.

## How we built it

We built everything inside Lens Studio, Snapchat's official tool for making lenses for their app and for Spectacles. All of the programming was in TypeScript using their API. We did attempt to use other APIs, but they have ML solutions and almost everything except LLMs built in.

## Challenges we ran into
We ran into quite a few challenges, but we managed to overcome them all. Our first challenge was that a new version of Lens Studio and Spectacles themselves had just released extremely recently, this meant the amount of documentation or resources available was very little. We managed to dig through the documentation, ask questions as needed, and use our Unity experience to work our way through.

Another challenge was when things didn't perfectly match Unity's system. In Unity, you make a collider and a physics body separately, and in most cases you need to attach both, so naturally we did the same here. However, in Lens Studio a physics body comes with a collider built in, so we had two colliders inside each other which causes infinite collisions and ignoring every other force. In this case, we went to the SnapAR team for help where after debugging, they pointed out that we had two colliders.

## Accomplishments that we're proud of

We're proud to have made an end-to-end immersive experience for Snap Spectacles. This is technology that wasn't publicly revealed until last week, that had almost no information online, and that even two days ago we said we'd be happy if we could make anything in Lens Studio because it was so hard to figure out. Despite these hurdles we learned it, we understood Lens Studio and gained confidence that we can learn anything no matter how new or hidden.

## What we learned

We all learned the basics of AR development, Lens Studio, and TypeScript. Some of us had Unity experience going in but this was the first time developing AR software for all of us.

## What's next for WizARdly Horrors
In general, we hope to add more choices and better immersion into our games. We could potentially use diffusion models to allow players to customize the NPCs in their game in real time. We could use image segmentation to allow for more realistic obstructions, we could use world maps to force enemies to path toward you. We could have a run mode where a horde chases you and you need to run away from them (while lens tracks your progress). 
