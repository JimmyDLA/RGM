import { useRef } from "react";
import { Input, Tag, NativeSelect, Accordion, Button} from "@chakra-ui/react";
import EmojiPicker from 'emoji-picker-react';
import { placesTypes } from './assets/places_types';

export const InputTools = ({ 
  marker, 
  setMarker, 
  nearbyType, 
  setNearbyType,
  setCount,
  setRadius,
  setRefreshCount,
  inputRef
}) => {
  const accordRef = useRef(null)
  const handleEmojiSelect = (e) => {
    setMarker(e.emoji)
  }

  const handleOnChange = (e) => {
    const data = JSON.parse(e.target.value)
    const newType = [...nearbyType, data.type]
    setNearbyType(newType)
  }

  const handleTag = (item) => {
    setNearbyType(nearbyType.filter((type) => type !== item));
    setRefreshCount((c) => c + 1)
  }

  const handleCount = (e) => {
    const value = e.target.value
    setCount(parseInt(value ? value : '100'))
  }

  const handleRadius = (e) => {
    const value = e.target.value
    setRadius(parseInt(value ?  value : '5001'))
  }

  const handleSearch = () => {
    setRefreshCount((c) => c + 1)
  }

  return (
    <div style={styles.container}>
      <p>Location:</p>
      <div style={styles.location}>
        <Input ref={inputRef} placeholder='Enter Location' />
      </div>
      <hr />

      {nearbyType.map((item, idx) => (
        <Tag.Root key={`${item}${idx}`}>
          <Tag.Label>{item}</Tag.Label>
          <Tag.EndElement>
            <Tag.CloseTrigger onClick={() => handleTag(item)} />
          </Tag.EndElement>
        </Tag.Root>
      ))}
      {/* <hr /> */}

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

      <p>Count</p>
      <NativeSelect.Root>
        <NativeSelect.Field placeholder='Select' onChange={handleCount}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
          <option value={30}>30</option>
          <option value={35}>35</option>
          <option value={40}>40</option>
          <option value={45}>45</option>
          <option value={50}>50</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
      <hr />

      <p>Radius</p>
      <NativeSelect.Root>
        <NativeSelect.Field placeholder='Select' onChange={handleRadius}>
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
      <hr />

      <Accordion.Root collapsible ref={accordRef} >
        <Accordion.Item>
          <Accordion.ItemTrigger>
            <p>Select a Marker: <span style={styles.emojiSpan}>{marker}</span></p>
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
      <Button onClick={handleSearch}>Search</Button>
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