import { useState } from 'react';
import { Button, Input, Checkbox, NativeSelect , Accordion} from "@chakra-ui/react";
import EmojiPicker from 'emoji-picker-react';
import { placesTypes } from './assets/places_types';


export const InputTools = ({ marker, setMarker, nearbyType, setNearbyType }) => {
  const [text, setText] = useState('');
  const [location, setLocation] = useState('');
  console.log(nearbyType)
  const handleEmojiSelect = (e) => {
    setMarker(e.emoji)
  } 

  const handleOnChange = (e) => {
    const data = JSON.parse(e.target.value)
    setMarker(data.emoji)
    setNearbyType(data.type)
  }

  return (
    <div style={styles.container}>
      <Input value={location} placeholder='Location' onChange={e => setLocation(e.target.value)}/>
      <Button>GO</Button>
      <hr />
      
      <p>Place Types</p>
      <NativeSelect.Root>
        <NativeSelect.Field placeholder='Select' onChange={handleOnChange} >
          {placesTypes.map((item, idx) => (
            <option 
              value={JSON.stringify(item)}
              key={`${item.type}${idx}`}
            >
              {item.name}
            </option>
            
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
    </NativeSelect.Root>
      <hr />
      
      
      <Accordion.Root collapsible >
        <Accordion.Item>
          <Accordion.ItemTrigger>
            <p>Marker: <span style={styles.emojiSpan}>{marker}</span></p>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <EmojiPicker lazyLoadEmojis={true} allowExpandReactions onEmojiClick={handleEmojiSelect} />
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
      <hr />

      <p>Count</p>
      <NativeSelect.Root>
      <NativeSelect.Field placeholder='Select'>
        <option value="1">5</option>
        <option value="2">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
        <option value="30">30</option>
        <option value="35">35</option>
        <option value="40">40</option>
        <option value="45">45</option>
        <option value="50">50</option>
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
    <hr />

    <p>Radius</p>
    <NativeSelect.Root>
      <NativeSelect.Field placeholder='Select'>
        <option value="1">5</option>
        <option value="2">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
        <option value="30">30</option>
        <option value="35">35</option>
        <option value="40">40</option>
        <option value="45">45</option>
        <option value="50">50</option>
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
    </div>
  )
}

const styles = {
  container: {
    padding: '10px',
    width: '370px'
  },
  emojiSpan: {
    fontSize: '30px'
  }
}