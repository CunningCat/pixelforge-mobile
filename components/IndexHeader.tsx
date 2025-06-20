
import { Text, TouchableOpacity, View } from "react-native";
export default function IndexHeader({onselectCommunity,selectCommunity}:{onselectCommunity:(tag:string)=>void,selectCommunity:string}) {
  const tags = ['首页', '英雄联盟', '数码硬件', '守望先锋'];
  return (
    <View className="head flex flex-row gap-2">
      {tags.map((tag) => (
        <TouchableOpacity key={tag} onPress={() => onselectCommunity(tag)}>
          <Text className="headtext" style={{ color: selectCommunity === tag ? '#fff' : '#d3d3d3', fontSize:selectCommunity === tag ? 26 : 16}} id={tag}>{tag}</Text>
        </TouchableOpacity>
      ))}
      
    </View>

  );
}