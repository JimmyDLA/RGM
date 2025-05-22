import { useState } from 'react';
import { Button, Input, Checkbox, NativeSelect } from "@chakra-ui/react";
import EmojiPicker from 'emoji-picker-react';


export const InputTools = () => {
  const [text, setText] = useState('');
  const [location, setLocation] = useState('');
  const [checked, setChecked] = useState(false);

  return (
    <div>
       <Input value={location} placeholder='Location' onChange={e => setLocation(e.target.value)}/>
      <Button>GO</Button>
      <hr />
      <Input value={text} placeholder='Search' onChange={e => setText(e.target.value)}/>
      <Button>GO</Button>
      <hr />
     
      {!checked && (<p>Marker: 📍</p>)}
      <Checkbox.Root checked={checked} onCheckedChange={(e) => setChecked(!!e.checked)}>
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>Use custome emoji marker</Checkbox.Label>
      </Checkbox.Root>
      {checked && (<EmojiPicker lazyLoadEmojis={true} allowExpandReactions reactionsDefaultOpen />)}
      <hr />

      <NativeSelect.Root>
      <NativeSelect.Field placeholder='Select Count'>
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

    <NativeSelect.Root>
      <NativeSelect.Field placeholder='Select Radius'>
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