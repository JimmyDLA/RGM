import { useEffect, useState } from 'react';
import { IconButton, Input, Tag, NativeSelect , Accordion} from "@chakra-ui/react";
import EmojiPicker from 'emoji-picker-react';
import { placesTypes } from './assets/places_types';
import { LuSearch } from "react-icons/lu"

export const InputTools = ({ marker, setMarker, nearbyType, setNearbyType }) => {
  const [text, setText] = useState('');
  const [location, setLocation] = useState('');
  console.log('InputTools ', nearbyType)

  useEffect(() => {
    console.log('inputtools useEffect', nearbyType)
  }, [nearbyType])

  const handleEmojiSelect = (e) => {
    setMarker(e.emoji)
  } 

  const handleOnChange = (e) => {
    const data = JSON.parse(e.target.value)
    console.log('handleOnChange ', nearbyType, data.type)
    const newType = [...nearbyType, data.type]
    setNearbyType(newType)
  }

  const handleTag = (item) => {
    console.log(item, nearbyType)
    const copy = nearbyType;
    const index = copy.indexOf(item);
    if (index > -1) {
      copy.splice(index, 1);
    }
    setNearbyType(copy);
  }

  return (
    <div style={styles.container}>
      <div style={styles.location}>
        <Input value={location} placeholder='Location' onChange={e => setLocation(e.target.value)}/>
        <IconButton colorPalette="blue">
          <LuSearch />
        </IconButton>
      </div>
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
      {nearbyType.map((item, idx) => (
        <Tag.Root key={`${item}${idx}`}>
          <Tag.Label>{item}</Tag.Label>
          <Tag.EndElement>
            <Tag.CloseTrigger onClick={() => handleTag(item)} />
          </Tag.EndElement>
        </Tag.Root>
      ))}
      <p>Include Places</p>
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

    <p>Exclude Places</p>
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
        <option value="500">500 meters</option>
        <option value="1000">1000 meters</option>
        <option value="1500">1500 meters</option>
        <option value="2000">2000 meters</option>
        <option value="2500">2500 meters</option>
        <option value="3000">3000 meters</option>
        <option value="3500">3500 meters</option>
        <option value="4000">4000 meters</option>
        <option value="4500">4500 meters</option>
        <option value="5000">5000 meters</option>
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
  },
  location: {
    display: 'flex',
    flexDirection: 'row'
  }
}