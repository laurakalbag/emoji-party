import { useStatelyActor } from '@statelyai/sky-react';
import { emojisplosion } from 'emojisplosion';
import { useEffect, useState, useRef } from 'react';
import { skyConfig } from './emojiParty.sky';

const url = 'https://sky.stately.ai/0m8b68';

export default function EmojiParty() {
  // Try opening the app in multiple tabs to see the count change
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);

  const [state, send, , sky] = useStatelyActor(
    {
      apiKey: import.meta.env.VITE_SKY_API_KEY,
      url,
      sessionId: 'shared-counter',
      // These callbacks are optional, but can be useful for updating UI
      // Warning the numbers are not guaranteed to be accurate in dev mode because of hot-reloading
      // To see the real current number try a page-refresh
      onPlayerJoined(info) {
        setNumberOfPlayers(info.numberOfPlayers);
      },
      onPlayerLeft(info) {
        setNumberOfPlayers(info.numberOfPlayers);
      },
    },
    skyConfig,
  );


  const prevSunRef = useRef(state.context.sun);
  const prevBalloonRef = useRef(state.context.balloon);
  const prevCloudRef = useRef(state.context.cloud);
  const prevSparkleRef = useRef(state.context.sparkle);

  useEffect(() => {
    if (state.context.sun > prevSunRef.current) {
      emojisplosion({
        emojiCount: 10,
        emojis: ['☀️'],
        physics: {
            gravity: -0.0001,
            initialVelocities: {
                rotation: {
                    max: 10,
                    min: -10,
                },
                x: {
                    min: -5,
                    max: 5,
                  },
                  y: {
                    min: -10,
                    max: 10,
                  },
            },
        },
      });
    }
    prevSunRef.current = state.context.sun;
  }, [state.context.sun]);

  useEffect(() => {
    if (state.context.balloon > prevBalloonRef.current) {
      emojisplosion({
        emojiCount: 30,
        emojis: ['🎈'],
        physics: {
            gravity: -0.0001,
            initialVelocities: {
                rotation: {
                    max: 1,
                    min: -1,
                },
                x: {
                    min: -10,
                    max: 10,
                  },
                  y: {
                    min: -20,
                    max: 20,
                  },
            },
        },
      });
    }
    prevBalloonRef.current = state.context.balloon;
  }, [state.context.balloon]);

  useEffect(() => {
    if (state.context.cloud > prevCloudRef.current) {
      emojisplosion({
        emojiCount: 15,
        emojis: ['☁️'],
        physics: {
            gravity: -0.0001,
            initialVelocities: {
                rotation: {
                    max: 1,
                    min: -1,
                },
                x: {
                    min: -10,
                    max: 10,
                  },
                  y: {
                    min: -20,
                    max: 20,
                  },
            },
        },
      });
    }
    prevCloudRef.current = state.context.cloud;
  }, [state.context.cloud]);

  useEffect(() => {
    if (state.context.sparkle > prevSparkleRef.current) {
      emojisplosion({
        emojiCount: 15,
        emojis: ['✨'],
        physics: {
            gravity: 0.1,
            initialVelocities: {
                rotation: {
                    max: 10,
                    min: -10,
                },
                x: {
                    min: -10,
                    max: 10,
                  },
                  y: {
                    min: -20,
                    max: 20,
                  },
            },
        },
      });
    }
    prevSparkleRef.current = state.context.sparkle;
  }, [state.context.sparkle]);

  if (sky.isConnecting) {
    return <p>Connecting to Stately Sky...</p>;
  }

  return (
    <div>
      <div className="example-info">
        <h1>🌤️ Emoji Party</h1>
        <p className="partygoers">Current partygoers: {numberOfPlayers}</p>
      </div>

      <div id="partyspace"></div>

      <div className="next-events">
        <h2>Choose how to celebrate:</h2>
        <div className="event-buttons">
          <button className="balloon"
            onClick={() => {
              send?.({ type: 'balloon' });
            }}
          >
            🎈 Balloon
          </button>
          <button className="sparkle"
            onClick={() => {
              send?.({ type: 'sparkle' });
            }}
          >
            ✨ Sparkle
          </button>
          <button className="cloud"
            onClick={() => {
              send?.({ type: 'cloud' });
            }}
          >
            ☁️ Cloud
          </button>
          <button className="sun"
            onClick={() => {
              send?.({ type: 'sun' });
            }}
          >
            ☀️ Sun
          </button>
          <button className="reset"
            onClick={() => {
              send?.({ type: 'reset' });
            }}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="example-info">
        <p>
          <a href={url} target="_blank">
            Check out this machine in the Stately Studio
          </a>
        </p>
        <p>
          Everything is multiplayer by default, we’re using{' '}
          <a href="https://partykit.io" target="_blank">
            PartyKit 🎈
          </a>{' '}
          internally.
        </p>
        <p>
          If you see the state change, someone else is also using this example
          right now!
        </p>
      </div>
    </div>
  );
}
